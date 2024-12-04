import { create } from "zustand";

interface Post {
  id: number;
  author: string;
  content: string;
  image: string;
  liked: boolean;
  bookmarked: boolean;
}

interface StoreState {
  posts: Post[];
  bookmarks: Post[];
  toggleLike: (id: number) => void;
  toggleBookmark: (id: number) => void;
}

const useStore = create<StoreState>((set) => ({
  posts: [
    {
      id: 1,
      author: "John Doe",
      content: "This is a post.",
      image: "https://via.placeholder.com/600",
      liked: false,
      bookmarked: false,
    },
  ],
  bookmarks: [],
  toggleLike: (id: number) =>
    set((state: StoreState) => {
      const updatedPosts = state.posts.map((post: Post) =>
        post.id === id ? { ...post, liked: !post.liked } : post
      );
      return { posts: updatedPosts };
    }),
  toggleBookmark: (id: number) =>
    set((state: StoreState) => {
      const updatedPosts = state.posts.map((post: Post) =>
        post.id === id ? { ...post, bookmarked: !post.bookmarked } : post
      );
      const updatedBookmarks = updatedPosts.filter((post: Post) => post.bookmarked);
      return { posts: updatedPosts, bookmarks: updatedBookmarks };
    }),
}));

export default useStore;
