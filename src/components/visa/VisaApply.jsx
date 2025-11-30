// VisaApply.jsx
import React, { useRef, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { visaData } from "../../data/visaData"; // Path to your visaData file
import { visaProducts } from "../../data/visaProducts"; // Path to your visaProducts file
import { ArrowLeft, ArrowRight } from "lucide-react";
import LoginModal from "../../components/auth/LoginModal";
import { useAuth } from "../../context/AuthContext";

// Utility function (make sure this is accessible or defined)
function formatMoney(n) {
  return new Intl.NumberFormat("en-IN").format(n);
}

export default function VisaApply() {
  const { slug, purpose } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // <-- Key change: Get location state
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  // --- FIX: Retrieve and find selected product from state ---
  const productId = location.state?.productId;

  // 1. Get generic content (requirements, schedule)
  const data = visaData[slug]?.[purpose];

  // 2. Look up the specific product (price, title) using the ID
  const allForCountry = visaProducts[slug] || {};
  const baseList = allForCountry[purpose] || [];
  const selectedProduct = baseList.find((p) => p.id === productId);

  // --- END FIX ---

  const disclaimerRef = useRef();
  const scheduleRef = useRef();
  const timingsRef = useRef();
  const documentsRef = useRef();
  const detailsRef = useRef();
  const faqRef = useRef();

  const scrollTo = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  if (!data || !selectedProduct) {
    return (
      <div className="max-w-5xl mx-auto p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          {data
            ? "Selected visa product not found!"
            : "Visa content not found!"}
        </h2>
        <button
          onClick={() => navigate(`/visa/${slug}/${purpose}`)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
        >
          Go Back to Options
        </button>
      </div>
    );
  }

  const handleNext = () => {
    console.log(user);
    if (user) {
      // FIX: Pass the selected productId to the next page /applyvisa
      // This allows ApplyVisa to fetch the price again
      navigate(`/visa/${slug}/${purpose}/applyvisa`, {
        state: { productId: selectedProduct.id },
      });
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="relative">
      <div className={showLogin ? "pointer-events-none blur-sm" : ""}>
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Breadcrumb (using data.country and data.visaType) */}
          <nav className="text-sm text-gray-600 mb-2 flex flex-wrap gap-1">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link to="/visa" className="hover:text-blue-600">
              {data.country}
            </Link>
            <span>/</span>
            <Link to={`/visa/${slug}`} className="hover:text-blue-600">
              {data.visaType}
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Apply</span>
          </nav>

          {/* Header: Displays SELECTED PRODUCT PRICE and DETAILS */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={data.image}
              alt={data.country}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 bg-white">
              <h1 className="text-2xl font-bold text-gray-800">
                {selectedProduct.title} ({data.country})
              </h1>
              <p className="text-lg font-semibold text-amber-600 mt-1">
                Price: {selectedProduct.currency}
                {formatMoney(selectedProduct.price)} per adult
              </p>
              <p className="text-gray-500 mt-1">
                Stay Duration: {selectedProduct.stayDays} days | Validity:{" "}
                {selectedProduct.validityDays} days
              </p>
            </div>
          </div>

          {/* Section Nav */}
          <div className="flex flex-wrap gap-3 justify-center sticky top-20 bg-white py-3 z-10 border-b">
            {[
              ["Plan Disclaimer", disclaimerRef],
              ["Visa Schedule", scheduleRef],
              ["Timings & Holidays", timingsRef],
              ["Documents Required", documentsRef],
              ["Important Details", detailsRef],
              ["FAQs", faqRef],
            ].map(([label, ref]) => (
              <button
                key={label}
                onClick={() => scrollTo(ref)}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sections (Uses visaData content) */}
          <section ref={disclaimerRef}>
            <h2 className="text-xl font-semibold mb-3">Plan Disclaimer</h2>
            <ul className="list-disc ml-6 text-gray-600">
              {data.disclaimer.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
          {/* ... (rest of the sections: scheduleRef, timingsRef, documentsRef, detailsRef, faqRef) ... */}

          {/* Bottom actions */}
          <div className="flex justify-between pt-6">
            <button
              onClick={() => navigate(`/visa/${slug}/${purpose}`)}
              className="flex items-center gap-2 px-5 py-2 border rounded-xl text-gray-700 hover:bg-gray-100"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Next Step <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
