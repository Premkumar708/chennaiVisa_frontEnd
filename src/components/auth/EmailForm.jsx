import { useState } from "react";
import { Mail } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const EmailForm = ({ activeTab, onSuccess }) => {
  const isSignup = activeTab === "signup";

  const [error, setError] = useState("");

  return (
    <div>
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Mail size={18} className="text-yellow-400" />
        {isSignup ? "Sign up with Email" : "Login with Email"}
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="my-4 text-white text-center">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            try {
              const token = credentialResponse.credential;
              const decoded = jwtDecode(token);

              const userPayload = {
                name: decoded.name,
                email: decoded.email,
                picture: decoded.picture,
                googleToken: token,
              };

              onSuccess(userPayload);
            } catch (e) {
              setError("Google login failed.");
            }
          }}
          onError={() => setError("Google login failed.")}
        />
      </div>
    </div>
  );
};

export default EmailForm;
