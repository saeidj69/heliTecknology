import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import PostCard from "./PostCard"; 

const BookmarkList: React.FC = () => {
  const navigate = useNavigate();
  const bookmarks = useStore((state) => state.bookmarks);

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate("/")}
        className="text-blue-500 underline mb-4"
      >
         Back to Feed
      </button>
      <h1 className="text-2xl font-bold mb-6">Bookmarked Posts ({bookmarks.length})</h1>

      
      {bookmarks.length === 0 ? (
        <p className="text-gray-500">No bookmarked posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              author={post.author}
              content={post.content}
              image={post.image}
              liked={post.liked}
              bookmarked={post.bookmarked}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkList;
