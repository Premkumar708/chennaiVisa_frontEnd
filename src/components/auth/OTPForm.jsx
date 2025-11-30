import { useState, useEffect, useMemo } from "react";
import { Phone, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const OTPForm = ({ activeTab = "login", onSuccess }) => {
  if (activeTab !== "login") return null;
  const { sendOTP, verifyOTP } = useAuth();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("input");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [timer, setTimer] = useState(0);

  const phoneDigits = useMemo(() => phone.replace(/\D/g, ""), [phone]);
  const isPhoneValid = phoneDigits.length === 10;

  useEffect(() => {
    if (timer > 0) {
      const id = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(id);
    }
  }, [timer]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError(""); setInfo("");

    if (!isPhoneValid) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);
      const res = await sendOTP?.(phoneDigits);
      setInfo(res?.message || "OTP sent successfully");
      setStep("otp");
      setTimer(30);
    } catch (err) {
      setError(err?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);
      await verifyOTP?.(phoneDigits, otp);
      setStep("success");

      setTimeout(() => {
        onSuccess?.({ phone: `+91${phoneDigits}` });
      }, 900);
    } catch (err) {
      setError(err?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(""); setInfo("");
    try {
      setLoading(true);
      const res = await sendOTP?.(phoneDigits);
      setInfo(res?.message || "OTP resent");
      setTimer(30);
    } catch (err) {
      setError(err?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Phone size={18} className="text-yellow-400" />
        Login / Signup with Phone
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}
      {info && (
        <div className="mb-4 p-3 bg-green-900 border border-green-700 text-green-200 rounded-lg text-sm">
          {info}
        </div>
      )}

      {step === "input" && (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <input
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
            inputMode="numeric"
          />
          <button
            type="submit"
            disabled={loading || !isPhoneValid}
            className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-300 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleVerifyOTP} className="space-y-3">
          <div className="text-gray-300 text-sm">
            OTP sent to <span className="text-yellow-300">+91 {phoneDigits}</span>
          </div>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white tracking-widest"
            inputMode="numeric"
            maxLength={6}
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-300 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={() => { setStep("input"); setOtp(""); setError(""); setInfo(""); }}
              className="px-4 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600"
            >
              Edit
            </button>
          </div>

          <div className="text-center text-gray-400 text-sm mt-1">
            {timer > 0 ? (
              <span>Resend OTP in {timer}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={loading}
                className="text-yellow-400 hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </form>
      )}

      {step === "success" && (
        <div className="flex flex-col items-center justify-center text-center py-6">
          <CheckCircle size={48} className="text-green-400 mb-2 animate-bounce" />
          <p className="text-green-400 font-semibold">OTP Verified Successfully!</p>
        </div>
      )}
    </div>
  );
};

export default OTPForm;
