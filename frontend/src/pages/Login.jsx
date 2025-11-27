import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import authBg from "../assets/auth-bg.svg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    navigate("/dashboard");
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      toast.success(result.message);
      navigate("/dashboard");
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-purple-50 to-purple-100">
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
              <p className="text-gray-500 text-sm mt-2">
                Welcome to Digitalflake admin
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Id"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="text-right mb-6">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-secondary transition disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </button>

              <div className="text-center mt-4">
                <span className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                </span>
                <Link
                  to="/register"
                  className="text-primary hover:underline text-sm font-semibold"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div
        className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundColor: "#F5F7FA",
        }}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to DigitalFlake
          </h2>
          <p className="text-gray-600 text-lg">
            Manage your admin panel efficiently
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
