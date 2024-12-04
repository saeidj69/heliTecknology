import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const storedDarkMode = localStorage.getItem("darkMode");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(storedDarkMode === "true");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center sm:p-3">
      <h1 className="text-xl font-bold">Social Feed</h1>

      <div className="flex space-x-4 items-center">
        <Link
          to="/bookmarks"
          className="text-white hover:underline"
        >
          Bookmarks
        </Link>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 ${
            isDarkMode ? "bg-blue-600" : "bg-yellow-500"
          }`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
};

export default Header;
