import { Droplets, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const NavBar = ({ activeView, setActiveView }) => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { key: "home", label: "Home" },
    { key: "map", label: "Map" },
    { key: "analytics", label: "Analytics" },
    { key: "admin", label: "Admin" },
    { key: "citizen", label: "Citizen" },
    { key: "about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-[1000] bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Droplets className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold">DrainSmart</span>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveView(item.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  activeView === item.key
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              {item.label}
            </button>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-3 p-2 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700
                       hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
