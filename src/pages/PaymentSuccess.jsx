// src/pages/PaymentSuccess.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

/**
 * PaymentSuccess
 * - Shows a professional, clean receipt / order details page
 * - Allows client-side PDF download using jsPDF (loaded at runtime)
 *
 * Expects navigation state: { orderId, paymentId, product, qty, amount, customer }
 */

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.body.appendChild(s);
  });

function formatMoney(n) {
  return new Intl.NumberFormat("en-IN").format(Number(n || 0));
}

export default function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // initialize order data from navigation state (fallbacks)
  const [orderData, setOrderData] = useState(() => {
    return {
      orderId:
        state?.orderId || state?.razorpay_order_id || state?.order?.id || "",
      paymentId: state?.paymentId || state?.razorpay_payment_id || "",
      product: state?.product || state?.productData || null,
      qty: state?.qty || state?.quantity || 1,
      amount: state?.amount || state?.total || 0,
      customer: state?.customer || {
        name: state?.name || "",
        email: state?.email || "",
      },
      createdAt: state?.createdAt || new Date().toISOString(),
    };
  });

  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingRemote, setLoadingRemote] = useState(false);
  const [error, setError] = useState("");

  // If user navigated directly here without state, optionally fetch order info
  useEffect(() => {
    async function fetchMissing() {
      if (
        (orderData.orderId || orderData.paymentId) &&
        (!orderData.product || !orderData.amount)
      ) {
        try {
          setLoadingRemote(true);
          const API =
            import.meta.env.VITE_API_LOCAL_URL || "http://localhost:3000";
          const id = orderData.orderId || orderData.paymentId;
          const res = await fetch(`${API}/api/order/${encodeURIComponent(id)}`);
          if (!res.ok) throw new Error("Failed to fetch order from server");
          const json = await res.json();
          setOrderData((prev) => ({ ...prev, ...json }));
        } catch (err) {
          console.warn("Could not fetch order data:", err);
          setError(
            "Could not load some order details. If this problem persists, contact support."
          );
        } finally {
          setLoadingRemote(false);
        }
      }
    }
    fetchMissing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ======== NEW: Generate PDF using jsPDF (no html2canvas) =========
  // A simple, professional layout built with text and rectangles.
  const downloadPdf = async () => {
    setLoadingPdf(true);
    try {
      // load jsPDF UMD
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
      );
      // retrieve jsPDF constructor from window
      // eslint-disable-next-line no-undef
      const { jsPDF } = window.jspdf || (window.jspdf = window.jspdf || {});
      if (!jsPDF) throw new Error("jsPDF failed to load");

      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const left = 40;
      const rightLimit = 555; // a4 width ~595pt; set 40pt margins
      const startY = 60;
      let y = startY;

      // Header
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Chennai Visa Service", left, y);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Payment Receipt", rightLimit - 90, y); // right aligned-ish
      y += 18;

      // Divider
      doc.setDrawColor(230);
      doc.setLineWidth(0.5);
      doc.line(left, y, rightLimit, y);
      y += 12;

      // Order & Payment details (right column)
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const { orderId, paymentId, product, qty, amount, customer, createdAt } =
        orderData;
      // left block - payer
      doc.setFontSize(9);
      doc.text("Paid By:", left, y);
      doc.setFont("helvetica", "bold");
      doc.text(customer?.name || "Customer", left, y + 14);
      if (customer?.email) {
        doc.setFont("helvetica", "normal");
        doc.text(customer.email, left, y + 28);
      }

      // right block - meta
      const rightColX = rightLimit - 180;
      doc.setFont("helvetica", "normal");
      doc.text("Order ID:", rightColX, y);
      doc.setFont("helvetica", "bold");
      doc.text(orderId || "—", rightColX, y + 14);
      doc.setFont("helvetica", "normal");
      doc.text("Payment ID:", rightColX + 0, y + 36);
      doc.setFont("helvetica", "bold");
      doc.text(paymentId || "—", rightColX, y + 50);

      y += 60;

      // Date & Status
      doc.setFont("helvetica", "normal");
      doc.text("Date:", left, y);
      doc.setFont("helvetica", "bold");
      doc.text(new Date(createdAt).toLocaleString(), left + 40, y);
      doc.setFont("helvetica", "normal");
      doc.text("Status:", rightColX, y);
      doc.setFont("helvetica", "bold");
      doc.text("Paid", rightColX + 40, y);

      y += 24;

      // Table header
      doc.setFillColor(245, 245, 245);
      doc.rect(left, y, rightLimit - left, 26, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Description", left + 6, y + 17);
      doc.text("Qty", rightLimit - 160, y + 17);
      doc.text("Unit", rightLimit - 90, y + 17);
      doc.text("Amount", rightLimit - 40, y + 17);
      y += 36;

      // Line item
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const title = product?.title || product?.name || "Visa Service";
      const subtitle = product?.subtitle || "";
      doc.text(title, left + 6, y);
      if (subtitle) {
        doc.setFontSize(9);
        doc.setTextColor(100);
        doc.text(subtitle, left + 6, y + 12);
        doc.setTextColor(0);
        y += 18;
      }
      const unitPrice =
        product?.price || (qty ? Number(amount || 0) / Number(qty || 1) : 0);
      doc.text(String(qty || 1), rightLimit - 160, y);
      doc.text(`₹${formatMoney(unitPrice)}`, rightLimit - 90, y);
      doc.setFont("helvetica", "bold");
      doc.text(
        `₹${formatMoney((unitPrice || 0) * (qty || 1))}`,
        rightLimit - 40,
        y
      );

      y += 36;

      // Totals
      doc.setLineWidth(0.5);
      doc.line(rightLimit - 260, y, rightLimit, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      doc.text("Subtotal", rightLimit - 160, y);
      doc.setFont("helvetica", "bold");
      doc.text(
        `₹${formatMoney((unitPrice || 0) * (qty || 1))}`,
        rightLimit - 40,
        y
      );

      y += 16;
      doc.setFont("helvetica", "normal");
      doc.text("Service Fee", rightLimit - 160, y);
      doc.setFont("helvetica", "normal");
      doc.text(`₹${formatMoney(0)}`, rightLimit - 40, y);

      y += 18;
      doc.setLineWidth(1);
      doc.line(rightLimit - 260, y, rightLimit, y);
      y += 12;
      doc.setFont("helvetica", "bold");
      doc.text("Total Paid", rightLimit - 160, y);
      doc.text(
        `₹${formatMoney(orderData.amount || unitPrice * (qty || 1))}`,
        rightLimit - 40,
        y
      );

      // Footer
      y += 36;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(
        "This receipt confirms that payment has been received for the services listed above. If you have questions, contact support.",
        left,
        y,
        { maxWidth: rightLimit - left }
      );

      // save pdf
      const filename = `receipt_${
        orderData.orderId || orderData.paymentId || Date.now()
      }.pdf`;
      doc.save(filename);
    } catch (err) {
      console.error("Failed to generate PDF", err);
      alert("Could not generate PDF. Please try again or contact support.");
    } finally {
      setLoadingPdf(false);
    }
  };

  // friendly fallback when no state
  if (!orderData.orderId && !orderData.paymentId && !orderData.product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-xl p-6 bg-white rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No receipt data found
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            It seems you opened this page directly. If you just made a payment,
            try opening the link we sent by email or go to the home page.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/" className="px-4 py-2 rounded bg-blue-600 text-white">
              Home
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded border"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { orderId, paymentId, product, qty, amount, customer, createdAt } =
    orderData;

  const unitPrice =
    product?.price || (qty ? Number(amount || 0) / Number(qty || 1) : 0);
  const formattedAmount = formatMoney(amount || unitPrice * (qty || 1));

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div
          ref={containerRef}
          className="bg-white border rounded-xl shadow p-6 print:p-0 print:shadow-none"
        >
          <header className="flex items-start justify-between gap-4 mb-6">
            <div>
              <img src="/logo.png" alt="Logo" className="h-10 w-auto mb-2" />
              <h1 className="text-2xl font-semibold text-slate-900">
                Payment Receipt
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Thank you for your payment.
              </p>
            </div>

            <div className="text-right text-sm">
              <div className="text-gray-700 font-semibold">Order ID</div>
              <div className="text-gray-900 mt-1">{orderId || "—"}</div>
              <div className="text-gray-700 font-semibold mt-3">Payment ID</div>
              <div className="text-gray-900 mt-1">{paymentId || "—"}</div>
            </div>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm text-gray-500">Paid By</h3>
              <div className="text-base font-semibold text-slate-900 mt-1">
                {customer?.name || customer?.customerName || "Customer"}
              </div>
              {customer?.email && (
                <div className="text-sm text-gray-500">{customer.email}</div>
              )}
            </div>

            <div>
              <h3 className="text-sm text-gray-500">Date & Time</h3>
              <div className="text-base font-semibold text-slate-900 mt-1">
                {new Date(createdAt).toLocaleString()}
              </div>

              <h3 className="text-sm text-gray-500 mt-3">Status</h3>
              <div className="inline-block mt-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm">
                Paid
              </div>
            </div>
          </section>

          <section className="mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b">
                  <th className="py-2">Description</th>
                  <th className="py-2 text-right">Qty</th>
                  <th className="py-2 text-right">Unit</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 align-top">
                    <div className="font-medium text-slate-900">
                      {product?.title || product?.name || "Visa Service"}
                    </div>
                    {product?.subtitle && (
                      <div className="text-xs text-gray-500">
                        {product.subtitle}
                      </div>
                    )}
                  </td>
                  <td className="py-3 align-top text-right">{qty}</td>
                  <td className="py-3 align-top text-right">
                    ₹{formatMoney(unitPrice)}
                  </td>
                  <td className="py-3 align-top text-right font-semibold">
                    ₹{formatMoney(unitPrice * qty)}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={3}
                    className="py-3 text-right text-sm text-gray-600"
                  >
                    Subtotal
                  </td>
                  <td className="py-3 text-right font-semibold">
                    ₹{formatMoney(unitPrice * qty)}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className="py-1 text-right text-sm text-gray-600"
                  >
                    Service Fee
                  </td>
                  <td className="py-1 text-right">₹{formatMoney(0)}</td>
                </tr>
                <tr className="border-t">
                  <td
                    colSpan={3}
                    className="py-3 text-right text-sm font-semibold"
                  >
                    Total Paid
                  </td>
                  <td className="py-3 text-right text-xl font-bold">
                    ₹{formattedAmount}
                  </td>
                </tr>
              </tfoot>
            </table>
          </section>

          <section className="text-xs text-gray-500">
            <p>
              This receipt confirms that payment has been received for the
              services listed above. If you have questions about this payment,
              please contact our support team.
            </p>
          </section>
        </div>

        {/* actions */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex gap-3">
            <button
              onClick={downloadPdf}
              disabled={loadingPdf}
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-slate-900 text-white hover:bg-slate-800"
            >
              {loadingPdf ? "Preparing PDF..." : "Download PDF"}
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded border"
            >
              Print
            </button>
          </div>

          <div className="flex gap-3">
            <Link to="/" className="px-4 py-2 rounded bg-gray-100">
              Home
            </Link>
            <button
              onClick={() => navigate("/visa")}
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Browse Visas
            </button>
          </div>
        </div>

        {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
        {loadingRemote && (
          <div className="mt-4 text-sm text-gray-600">
            Loading additional details…
          </div>
        )}
      </div>
    </div>
  );
}
