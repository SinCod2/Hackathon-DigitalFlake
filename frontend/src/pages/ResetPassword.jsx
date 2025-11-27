import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const result = await resetPassword(resetToken, formData.password);

    if (result.success) {
      toast.success(result.message);
      setTimeout(() => navigate("/login"), 2000);
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
              Reset Your Password
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Enter your new password below
            </p>
          </div>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-11 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Confirm New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-secondary transition disabled:opacity-50 mb-4"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

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

export default ResetPassword;
