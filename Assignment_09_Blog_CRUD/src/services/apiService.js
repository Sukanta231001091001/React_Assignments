import axios from 'axios';

const API_URL = 'http://localhost:3001/blogs';

// In-memory fallback if JSON Server is not running concurrently
let fallbackBlogs = [
  {
    id: "1",
    title: "Architecting Scalable Micro-Frontends with React & Vite",
    author: "Sophia Martinez",
    content: "Micro-frontends decompose monolithic frontend applications into smaller, independently deliverable apps. In this post, we explore how React and Vite enable module federation, isolated state management, and optimized bundling strategies for enterprise teams.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    date: "2026-09-10"
  },
  {
    id: "2",
    title: "Mastering Asynchronous State with Axios and Custom Hooks",
    author: "Alex Morgan",
    content: "Managing RESTful API calls cleanly in React requires proper lifecycle orchestration. We discuss how Axios interceptors, cancellation tokens, error boundaries, and custom hooks simplify data fetching.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    video: "",
    date: "2026-09-14"
  }
];

export async function getBlogsAPI() {
  try {
    const res = await axios.get(API_URL, { timeout: 2500 });
    return res.data;
  } catch (err) {
    console.warn("JSON Server not detected on http://localhost:3001. Using fallback mock API.");
    return [...fallbackBlogs];
  }
}

export async function createBlogAPI(newBlog) {
  try {
    const res = await axios.post(API_URL, newBlog, { timeout: 2500 });
    return res.data;
  } catch (err) {
    fallbackBlogs = [newBlog, ...fallbackBlogs];
    return newBlog;
  }
}

export async function updateBlogAPI(id, updatedBlog) {
  try {
    const res = await axios.put(`${API_URL}/${id}`, updatedBlog, { timeout: 2500 });
    return res.data;
  } catch (err) {
    fallbackBlogs = fallbackBlogs.map(b => b.id === id ? updatedBlog : b);
    return updatedBlog;
  }
}

export async function deleteBlogAPI(id) {
  try {
    await axios.delete(`${API_URL}/${id}`, { timeout: 2500 });
    return true;
  } catch (err) {
    fallbackBlogs = fallbackBlogs.filter(b => b.id !== id);
    return true;
  }
}
