
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

const useStore = create<StoreState>((set) => {
  
  const defaultPosts: Post[] = [
    {
      id: 1,
      author: "John Doe",
      content: "This is a sample post with some text and an image.",
      image: "https://via.placeholder.com/600",
      liked: false,
      bookmarked: false,
    },
    {
      id: 2,
      author: "Jane Smith",
      content: "Another sample post without an image.",
      image: "",
      liked: false,
      bookmarked: false,
    },
    {
      id: 3,
      author: "Alice Johnson",
      content: "Enjoying a sunny day at the beach!",
      image: "https://via.placeholder.com/600",
      liked: true,
      bookmarked: false,
    },
    {
      id: 4,
      author: "Bob Williams",
      content: "Had a great time hiking this weekend.",
      image: "",
      liked: false,
      bookmarked: false,
    },
    {
      id: 5,
      author: "Emily Davis",
      content: "Just finished reading a fantastic book!",
      image: "https://via.placeholder.com/600",
      liked: true,
      bookmarked: false,
    },
    {
      id: 6,
      author: "Michael Brown",
      content: "Check out this cool photo I took last night.",
      image: "https://via.placeholder.com/600",
      liked: false,
      bookmarked: false,
    },
    {
      id: 7,
      author: "Sarah Wilson",
      content: "Feeling grateful for all the support I've received.",
      image: "",
      liked: true,
      bookmarked: false,
    },
    {
      id: 8,
      author: "Chris Martinez",
      content: "Exploring new cities is always so much fun!",
      image: "https://via.placeholder.com/600",
      liked: false,
      bookmarked: false,
    },
    {
      id: 9,
      author: "Laura Taylor",
      content: "Happy to announce my new project launch!",
      image: "https://via.placeholder.com/600",
      liked: true,
      bookmarked: false,
    },
    {
      id: 10,
      author: "David Anderson",
      content: "Trying out some new recipes in the kitchen.",
      image: "",
      liked: false,
      bookmarked: false,
    },
    {
      id: 11,
      author: "Jessica Thomas",
      content: "Had a fantastic weekend getaway!",
      image: "https://via.placeholder.com/600",
      liked: false,
      bookmarked: false,
    },
    {
      id: 12,
      author: "Daniel Moore",
      content: "Looking forward to the upcoming concert!",
      image: "",
      liked: true,
      bookmarked: false,
    },
    {
      id: 13,
      author: "Sophia Jackson",
      content: "Enjoying the little things in life.",
      image: "https://via.placeholder.com/600",
      liked: true,
      bookmarked: false,
    },
    {
      id: 14,
      author: "Matthew White",
      content: "Learning new coding skills every day.",
      image: "",
      liked: false,
      bookmarked: false,
    },
    {
      id: 15,
      author: "Olivia Harris",
      content: "My new art piece is finally complete!",
      image: "https://via.placeholder.com/600",
      liked: true,
      bookmarked: false,
    },
    {
      id: 16,
      author: "James Clark",
      content: "Just got back from a fantastic road trip.",
      image: "",
      liked: false,
      bookmarked: false,
    },
    {
      id: 17,
      author: "Lily Lewis",
      content: "Enjoying the beautiful autumn weather.",
      image: "https://via.placeholder.com/600",
      liked: false,
      bookmarked: false,
    },
    {
      id: 18,
      author: "Benjamin Walker",
      content: "Can't wait to start my new job next week!",
      image: "",
      liked: true,
      bookmarked: false,
    },
    {
      id: 19,
      author: "Ava Young",
      content: "Capturing the beauty of nature through my lens.",
      image: "https://via.placeholder.com/600",
      liked: true,
      bookmarked: false,
    },
    {
      id: 20,
      author: "William Hall",
      content: "Reflecting on the past year with gratitude.",
      image: "",
      liked: false,
      bookmarked: false,
    },
    
  ];

  const savedPosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");

  const mergedPosts = savedPosts.length > 0
    ? savedPosts.map((savedPost) => {
        const defaultPost = defaultPosts.find((post) => post.id === savedPost.id);
        if (defaultPost) {
          return { ...defaultPost, ...savedPost }; 
        }
        return savedPost; 
      })
    : defaultPosts;

  return {
    posts: mergedPosts,
    bookmarks: JSON.parse(localStorage.getItem("bookmarks") || "[]"),

    toggleLike: (id: number) =>
      set((state) => {
        const updatedPosts = state.posts.map((post) =>
          post.id === id ? { ...post, liked: !post.liked } : post
        );
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
        return { posts: updatedPosts };
      }),

    toggleBookmark: (id: number) => {
      set((state) => {
        const updatedPosts = state.posts.map((post) =>
          post.id === id ? { ...post, bookmarked: !post.bookmarked } : post
        );
        const updatedBookmarks = updatedPosts.filter((post) => post.bookmarked);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        return { posts: updatedPosts, bookmarks: updatedBookmarks };
      });
    },
  };
});

export default useStore;
