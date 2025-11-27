import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser, FiX } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-primary font-bold text-lg">D</span>
            </div>
            <h1 className="text-xl font-semibold">digitalflake</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FiUser className="text-lg" />
              <span className="text-sm">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-white text-primary px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
              <h3 className="text-xl font-semibold">Confirm Logout</h3>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="text-white hover:text-gray-200"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-700 text-center mb-6">
                Are you sure you want to logout?
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded hover:from-red-700 hover:to-red-800 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
