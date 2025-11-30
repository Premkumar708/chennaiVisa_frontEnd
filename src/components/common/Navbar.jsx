import { Link, useLocation } from "react-router-dom";
import {
  User,
  Menu,
  X,
  Home,
  Plane,
  Phone,
  FileText,
  HelpCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import LoginModal from "../auth/LoginModal";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userSession, setUserSession] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    {
      to: "/",
      label: "Home",
      icon: <Home size={18} className="text-yellow-500" />,
    },
    {
      to: "/visa",
      label: "Visa",
      icon: <Plane size={18} className="text-[#002b5c]" />,
    },
    {
      to: "/contact",
      label: "Contact Us",
      icon: <Phone size={18} className="text-[#002b5c]" />,
    },
    {
      to: "/blogs",
      label: "Blogs",
      icon: <FileText size={18} className="text-[#002b5c]" />,
    },
    {
      to: "/faq",
      label: "FAQ's",
      icon: <HelpCircle size={18} className="text-[#002b5c]" />,
    },
  ];

  useEffect(() => {
    const storedSession = localStorage.getItem("userSession");
    // console.log(storedSession + isAuthenticated + isUserLoggedIn);
    if (storedSession != null) {
      setIsUserLoggedIn(true);
      setUserSession(JSON.parse(storedSession));
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  const handleLoginClick = () => {
    setIsOpen(false);
    setShowLoginModal(true);
  };

  const goTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center py-4">
        <div className="bg-[#f1f1f1]/95 backdrop-blur text-blue-900 flex items-center justify-between px-8 py-4 rounded-full shadow-lg w-[90%] md:w-[80%] lg:w-[70%]">
          <Link to="/" onClick={goTop} className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Chennai Visa Service Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={goTop}
                className={`transition-colors ${
                  location.pathname === to
                    ? "text-yellow-400"
                    : "text-blue-900 hover:text-yellow-400"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          {isAuthenticated || isUserLoggedIn ? (
            <div className="hidden md:flex items-center gap-3">
              {userSession.picture && (
                <img
                  src={userSession.picture}
                  alt="profile"
                  className="h-10 w-10 rounded-full border object-cover"
                />
              )}
              <span className="px-3 py-1.5 rounded-full bg-white text-blue-900 border">
                {user?.name || user?.phone}
              </span>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="text-blue-900/70 hover:text-blue-900 underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="hidden md:flex bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105 items-center gap-2"
            >
              <User size={18} />
              Login/Signup
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-blue-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-[80%] sm:w-[70%] bg-white shadow-2xl z-50 flex flex-col justify-between transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between bg-yellow-400 px-6 py-4">
              <img
                src="/logo.png"
                alt="Chennai Visa Service Logo"
                className="h-8 w-auto object-contain"
              />
              <button onClick={() => setIsOpen(false)} className="text-white">
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col mt-3 px-4 space-y-2">
              {navLinks.map(({ to, label, icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => {
                    setIsOpen(false);
                    goTop();
                  }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md ${
                    location.pathname === to
                      ? "bg-yellow-50 text-yellow-500 font-semibold"
                      : "text-[#002b5c] hover:bg-gray-100"
                  }`}
                >
                  {icon}
                  {label}
                </Link>
              ))}

              {/* Mobile Logout */}
              {isAuthenticated || isUserLoggedIn ? (
                <div className="mt-3">
                  <div className="mb-2 px-3 py-2 rounded-md bg-gray-100 text-[#002b5c]">
                    {user?.name || user?.phone}
                  </div>
                  <button
                    onClick={() => {
                      setShowLogoutModal(true);
                      setIsOpen(false);
                    }}
                    className="w-full text-left text-[#002b5c] underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="mt-4 bg-yellow-400 text-blue-900 w-full py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-yellow-300 transition-all"
                >
                  <User size={18} />
                  Login / Signup
                </button>
              )}
            </div>
          </div>

          <div className="px-5 py-4 text-xs text-center text-gray-500 border-t">
            © 2025 Chennai Visa Service. All rights reserved.
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">
              Are you sure you want to log out?
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              You will need to log in again to access your account.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                No, Stay Logged In
              </button>

              <button
                onClick={() => {
                  logout();
                  setShowLogoutModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Log Me Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
