// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Feed from "./components/Feed";
import BookmarkList from "./components/BookmarkList"; // Import BookmarkList page

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Feed />} /> {/* Main Feed Page */}
            <Route path="/bookmarks" element={<BookmarkList />} /> {/* Bookmarks Page */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
