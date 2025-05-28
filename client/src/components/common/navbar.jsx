import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/index"; // Assuming correct path
import {
  SunOutlined,
  MoonOutlined,
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined, // Optional: For logout button
  UserOutlined, // Optional: For a user avatar placeholder
} from "@ant-design/icons";
import {
  ACCENT_COLOR,
  activeMobileNavLinkClass,
  activeNavLinkClass,
  commonMobileNavLinkClass,
  commonNavLinkClass,
  inactiveMobileNavLinkClass,
  inactiveNavLinkClass,
} from "../styles/index";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // dark mode state management
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode
        ? JSON.parse(savedMode)
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Effect to apply dark mode class and save preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    }
  }, [isDarkMode]);

  // Function to toggle the mobile menu
  // and close it when a link is clicked
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  // Function to handle logout
  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };
  // Define navigation items for unauthenticated and authenticated users
  const unauthenticatedNavItems = [
    { name: "Sign Up", to: "/signup", icon: <UserOutlined /> /* Optional */ },
    {
      name: "Login",
      to: "/login",
      icon: (
        <LogoutOutlined rotate={-90} />
      ) /* Optional, rotate for 'login' sense */,
    },
  ];
  // Define navigation items for authenticated users
  const authenticatedNavItems = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: <UserOutlined />,
    },
    // Add other authenticated links here e.g. { name: "Profile", to: "/profile"}
  ];
  // Determine which navigation items to display based on authentication state
  const navItemsToDisplay = auth?.token
    ? authenticatedNavItems
    : unauthenticatedNavItems;

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <Link
              to={auth?.token ? "/dashboard" : "/"}
              className={`text-2xl font-bold dark:text-${ACCENT_COLOR}-400 hover:opacity-80 transition-opacity`}
              onClick={closeMenu}
            >
              <span className={`text-${ACCENT_COLOR}-500 dark:text-white`}>
                AppLogo
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-1">
            {" "}
            {/* Adjusted space-x for icons */}
            {navItemsToDisplay.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `${commonNavLinkClass} ${
                    isActive ? activeNavLinkClass : inactiveNavLinkClass
                  }`
                }
              >
                {item.icon && <span className="anticon">{item.icon}</span>}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Right side items: Dark Mode, User Info/Logout, Mobile Menu Button */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              type="button"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              className="px-2 py-1.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-emerald-500 transition-colors"
            >
              {isDarkMode ? (
                <SunOutlined className="text-xl" />
              ) : (
                <MoonOutlined className="text-xl" />
              )}
            </button>

            {auth?.token && (
              <div className="ml-3 flex items-center">
                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium mr-3 hidden md:block">
                  Hi, {auth.user?.username || "User"}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`bg-${ACCENT_COLOR}-500 hover:bg-${ACCENT_COLOR}-600 text-white ${commonNavLinkClass}`}
                >
                  <LogoutOutlined />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="ml-3 sm:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:focus:ring-slate-500"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <CloseOutlined className="text-xl" />
                ) : (
                  <MenuOutlined className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:hidden border-t border-slate-200 dark:border-slate-700`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navItemsToDisplay.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `${commonMobileNavLinkClass} ${
                  isActive
                    ? activeMobileNavLinkClass
                    : inactiveMobileNavLinkClass
                }`
              }
              onClick={closeMenu} // Close menu on item click
            >
              {item.icon && <span className="anticon">{item.icon}</span>}
              <span>{item.name}</span>
            </NavLink>
          ))}
          {/* If logged in, show logout in mobile menu as well */}
          {auth?.token && (
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }} // Ensure menu closes
              className={`${commonMobileNavLinkClass} ${inactiveMobileNavLinkClass} w-full text-left`} // Make it look like other links
            >
              <LogoutOutlined />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
