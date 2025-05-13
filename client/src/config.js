import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Define color
export const ACCENT_COLOR = "emerald";

export const commonNavLinkClass =
  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2"; // Added flex for icon alignment
export const activeNavLinkClass = `bg-${ACCENT_COLOR}-500 text-white dark:bg-${ACCENT_COLOR}-600`;
export const inactiveNavLinkClass = `text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-${ACCENT_COLOR}-600 dark:hover:text-${ACCENT_COLOR}-400`;

export const commonMobileNavLinkClass =
  "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2"; // Added flex
export const activeMobileNavLinkClass = `bg-${ACCENT_COLOR}-500 text-white dark:bg-${ACCENT_COLOR}-600`;
export const inactiveMobileNavLinkClass = `text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-${ACCENT_COLOR}-600 dark:hover:text-${ACCENT_COLOR}-400`;
