import { useState, useEffect } from "react";
import api from "../api";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", text: "" });
  const [editId, setEditId] = useState(null);
  const [userId, setUserId] = useState("");
  // Fetch all blogs on component mount
  useEffect(() => {
    getUser();
    fetchBlogs();
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

  return (
   <div className="max-w-2xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4">
        {editId ? "Edit Blog" : "Create Blog"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <textarea
          name="text"
          placeholder="Blog content..."
          value={form.text}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
        >
          {editId ? "Update" : "Post"} Blog
        </button>
      </form>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-2">All Blogs</h3>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="border p-4 mb-4 rounded shadow-sm">
            <h4 className="text-lg font-bold">
              {blog.title}- {blog.author.name}
            </h4>
            <p>{blog.text} </p>
            {blog.author._id === userId && (
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
            <hr className="my-6" />
          </div>
        ))
      )}
    </div>



  );
}

export default Home;
