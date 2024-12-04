import PostCard from "./PostCard";
import useStore from "../store/useStore";

const Feed: React.FC = () => {
  const posts = useStore((state) => state.posts);

  return (
<div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-6">Posts ({posts.length})</h1>
  
  {/* Render a message if no posts are available */}
  {posts.length === 0 ? (
    <p className="text-gray-500">No posts available</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
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

export default Feed;
