import Post from '../models/Post.js';

// Create Post
export const createPost = async (req, res) => {
  try {
    console.log("req.body", req.user.id);
    const { title, text } = req.body;
    const post = new Post({
      title,
      text,
      author: req.user.id, 
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Get All Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { title, text },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Post not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
