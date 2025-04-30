import { useState, useEffect } from "react";
import api from "../api";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", text: "" });
  const [editId, setEditId] = useState(null);
  const [userId, setUserId] = useState("");
  const [showScroll, setShowScroll] = useState(false);
  // Fetch all blogs on component mount
  useEffect(() => {
    getUser();
    fetchBlogs();
    // Listen for scroll event
    window.onscroll = () => {
      if (window.scrollY > 200) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    return () => {
      window.onscroll = null; // Clean up scroll event listener
    };
  }, []);
  const getUser = async () => {
    const res = await api.get("/profile");
    setUserId(res.data.id);
  };
  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      alert("Failed to load blogs");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/blogs/${editId}`, form);
        setEditId(null);
      } else {
        await api.post("/blogs", form);
      }
      setForm({ title: "", text: "" });
      fetchBlogs();
    } catch (err) {
      alert("Failed to submit blog");
    }
  };

  const handleEdit = (blog) => {
    setForm({ title: blog.title, text: blog.text });
    setEditId(blog._id);
    scrollToTop();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await api.delete(`/blogs/${id}`);
        fetchBlogs();
      } catch (err) {
        alert("Failed to delete blog");
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // or navigate to login page if routing
  };

  const formStyle = {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  };

  const buttonStyle = {
    padding: "10px 15px",
    backgroundColor: "#2ecc71",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  };
  // const buttonStyle = {
  // padding: '8px 15px',
  // borderRadius: '5px',
  // cursor: 'pointer',
  // };

  const containerStyle = {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
  };

  const headingStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const postCardStyle = {
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  };

  const postTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "600",
  };

  const postTextStyle = {
    fontSize: "1rem",
    color: "whight",
    marginTop: "10px",
  };

  const postAuthorStyle = {
    fontSize: "0.9rem",
    color: "#777",
    marginTop: "10px",
  };

  const postActionsStyle = {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#e74c3c",
    color: "white",
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3498db",
    color: "white",
  };
  const scrollToTopButtonStyle = {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    backgroundColor: "#2ecc71",
    color: "white",
    borderRadius: "50%",
    padding: "10px 15px",
    fontSize: "18px",
    cursor: "pointer",
    display: showScroll ? "block" : "none", // Show only if scrolled down
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
    border: "none",
    zIndex: 1000,
  };
  const topBarStyle = {
    position: "sticky",
    top: 0,
    backgroundColor: "#34495e",
    color: "white",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
  };

  const logoutButtonStyle = {
    backgroundColor: "#e74c3c",
    border: "none",
    color: "white",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <>
      <div>
        <div style={topBarStyle}>
          <h3 style={{ margin: 0 }}>📝 Blogging Platform</h3>
          {/* {user && ( */}
          <button style={logoutButtonStyle} onClick={handleLogout}>
            Logout
          </button>
          {/* )} */}
        </div>
        <div
          style={{
            position: "sticky",
            top: "60px", // just below the top bar
            backgroundColor: "#f9f9f9",
            // padding: "15px",
            // border: "1px solid #ddd",
            // borderRadius: "8px",
            margin: "10px auto",
            maxWidth: "800px",
            zIndex: 500,

            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>
              Create Post
            </h2>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              style={inputStyle}
              required
            />
            <textarea
              name="text"
              value={form.text}
              onChange={handleChange}
              placeholder="Content"
              style={inputStyle}
              required
            />
            <button type="submit" style={buttonStyle}>
              {editId ? "Update" : "Post"} Blog
            </button>
          </form>
        </div>

        <div style={containerStyle}>
          <h2 style={headingStyle}>All Blog Posts</h2>
          {blogs.map((post) => (
            <div key={post._id} style={postCardStyle}>
              <h3 style={postTitleStyle}>{post.title}</h3>
              <p style={postTextStyle}>{post.text}</p>
              <p style={postAuthorStyle}>By: {post.author.name}</p>

              {userId === post.author._id && (
                <div style={postActionsStyle}>
                  <button
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                  <button
                    style={editButtonStyle}
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
          {/* Go to top button */}
          <button
            style={scrollToTopButtonStyle}
            onClick={scrollToTop}
            aria-label="Go to top"
          >
            top
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
