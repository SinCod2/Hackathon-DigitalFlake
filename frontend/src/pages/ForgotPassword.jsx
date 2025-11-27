import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetUrl, setResetUrl] = useState("");
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await forgotPassword(email);

    if (result.success) {
      toast.success(result.message);
      if (result.data.resetUrl) {
        setResetUrl(result.data.resetUrl);
        toast.info(
          "Copy the reset link below (in production, this would be sent via email)"
        );
      }
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 mb-2">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">
                digitalflake
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Did you forget password?
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Enter your email address and we'll send you a link to restore
              password
            </p>
          </div>

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-secondary transition disabled:opacity-50 mb-4"
            >
              {loading ? "Sending..." : "Request reset link"}
            </button>

            {resetUrl && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-gray-700 font-medium mb-2">
                  Password Reset Link (for testing):
                </p>
                <input
                  type="text"
                  value={resetUrl}
                  readOnly
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white"
                  onClick={(e) => e.target.select()}
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(resetUrl);
                    toast.success("Link copied to clipboard!");
                  }}
                  className="mt-2 text-sm text-primary hover:underline"
                >
                  Copy link
                </button>
                <p className="mt-2 text-xs text-gray-500">
                  Note: In production, this link would be sent to your email
                </p>
              </div>
            )}

            <div className="text-center">
              <Link
                to="/login"
                className="text-primary hover:underline text-sm font-semibold"
              >
                Back to log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
