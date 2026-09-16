import React, { useState, useEffect } from 'react';
import { getBlogsAPI, createBlogAPI, updateBlogAPI, deleteBlogAPI } from './services/apiService';
import BlogModal from './components/BlogModal';
import ViewBlogModal from './components/ViewBlogModal';
import { BookOpen, Search, Plus, Eye, Edit3, Trash2, Loader2, AlertCircle, FileText } from 'lucide-react';

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null);

  const loadBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBlogsAPI();
      setBlogs(data);
    } catch (err) {
      setError("Failed to fetch blog posts from REST API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleSaveBlog = async (blogData) => {
    setLoading(true);
    try {
      if (editingBlog) {
        const updated = await updateBlogAPI(blogData.id, blogData);
        setBlogs(blogs.map((b) => (b.id === updated.id ? updated : b)));
      } else {
        const created = await createBlogAPI(blogData);
        setBlogs([created, ...blogs]);
      }
    } catch (err) {
      alert("Error saving blog article.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setLoading(true);
      try {
        await deleteBlogAPI(id);
        setBlogs(blogs.filter((b) => b.id !== id));
      } catch (err) {
        alert("Error deleting blog article.");
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="blog-app">
      <header className="header">
        <div className="brand">
          <BookOpen size={28} />
          <span>TechJournal — Blog Publishing Portal</span>
        </div>
      </header>

      <main className="container">
        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-box">
            <Search size={18} color="#8b949e" />
            <input
              type="text"
              placeholder="Search blog by keyword, author, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingBlog(null);
              setIsFormOpen(true);
            }}
          >
            <Plus size={18} /> Add Blog Post
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div style={{ background: 'rgba(248,81,73,0.15)', border: '1px solid rgba(248,81,73,0.3)', color: '#ff7b72', padding: '1rem 1.25rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertCircle size={24} />
            <div>
              <strong>API Request Failure:</strong> {error}
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#8b949e' }}>
            <Loader2 size={40} className="animate-spin" style={{ marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
            <p>Fetching blog posts from REST API...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredBlogs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#8b949e' }}>
            <FileText size={48} style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>No Blogs Available</h3>
            <p>No blog posts found. Click "Add Blog Post" to publish your first article.</p>
          </div>
        )}

        {/* Blogs Grid */}
        {!loading && filteredBlogs.length > 0 && (
          <div className="blog-grid">
            {filteredBlogs.map((blog) => {
              const wordCount = blog.content.trim() ? blog.content.trim().split(/\s+/).length : 0;

              return (
                <div key={blog.id} className="blog-card">
                  {blog.image ? (
                    <img src={blog.image} alt={blog.title} className="blog-img" />
                  ) : (
                    <div className="blog-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b949e' }}>
                      <BookOpen size={40} />
                    </div>
                  )}

                  <div className="blog-body">
                    <h3 className="blog-title">{blog.title}</h3>
                    <div className="blog-meta">
                      <span>By {blog.author}</span>
                      <span>{blog.date}</span>
                    </div>

                    <span className="word-count-tag">{wordCount} / 1000 words</span>

                    <p className="blog-excerpt">{blog.content}</p>

                    <div className="blog-footer">
                      <button
                        className="btn"
                        style={{ background: 'rgba(255,255,255,0.06)', color: 'white', fontSize: '0.82rem' }}
                        onClick={() => setViewingBlog(blog)}
                      >
                        <Eye size={14} /> View Blog
                      </button>

                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          className="btn btn-edit"
                          style={{ padding: '0.4rem 0.7rem', fontSize: '0.82rem' }}
                          onClick={() => {
                            setEditingBlog(blog);
                            setIsFormOpen(true);
                          }}
                        >
                          <Edit3 size={14} /> Edit
                        </button>

                        <button
                          className="btn btn-danger"
                          style={{ padding: '0.4rem 0.7rem', fontSize: '0.82rem' }}
                          onClick={() => handleDeleteBlog(blog.id)}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Form Modal (Add / Edit) */}
      <BlogModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveBlog}
        editingBlog={editingBlog}
      />

      {/* View Modal */}
      <ViewBlogModal blog={viewingBlog} onClose={() => setViewingBlog(null)} />

      <footer className="footer">
        <p>© {new Date().getFullYear()} TechJournal CRUD Blog App. Built with React, Axios & JSON Server.</p>
      </footer>
    </div>
  );
}
