// src/store/useStore.test.ts
import { act, render } from '@testing-library/react';
import useStore from './useStore';

describe('useStore', () => {
  let toggleLike: (id: number) => void;
  let toggleBookmark: (id: number) => void;

  beforeEach(() => {
    const state = useStore.getState();
    state.posts = []; 

    toggleLike = useStore.getState().toggleLike;
    toggleBookmark = useStore.getState().toggleBookmark;
  });

  test('should toggle like state of a post', () => {
    const initialPost = {
      id: 1,
      author: 'John Doe',
      content: 'Test Post',
      image: '',
      liked: false,
      bookmarked: false,
    };

    useStore.setState({ posts: [initialPost] });

    const post = useStore.getState().posts[0];
    expect(post.liked).toBe(false);

    act(() => {
      toggleLike(1); 
    });

    const updatedPost = useStore.getState().posts[0];
    expect(updatedPost.liked).toBe(true);

    act(() => {
      toggleLike(1);
    });

    const finalPost = useStore.getState().posts[0];
    expect(finalPost.liked).toBe(false);
  });

  test('should toggle bookmark state of a post', () => {
    const initialPost = {
      id: 1,
      author: 'John Doe',
      content: 'Test Post',
      image: '',
      liked: false,
      bookmarked: false,
    };

    useStore.setState({ posts: [initialPost] });

    const post = useStore.getState().posts[0];
    expect(post.bookmarked).toBe(false);

    act(() => {
      toggleBookmark(1); 
    });

    const updatedPost = useStore.getState().posts[0];
    expect(updatedPost.bookmarked).toBe(true);

    const bookmarks = useStore.getState().bookmarks;
    expect(bookmarks.length).toBe(1);
    expect(bookmarks[0].id).toBe(1);

    act(() => {
      toggleBookmark(1);
    });

    const finalPost = useStore.getState().posts[0];
    expect(finalPost.bookmarked).toBe(false);

    const finalBookmarks = useStore.getState().bookmarks;
    expect(finalBookmarks.length).toBe(0);
  });
});
