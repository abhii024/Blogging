import express from "express";
import { signup, login } from "../controllers/authController.js";
// import { createPost } from '../controllers/postController.js';
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} from '../controllers/postController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get('/profile', verifyToken, (req, res) => {
    res.json(req.user);
  });

router.post("/blogs", verifyToken, createPost);
router.get('/blogs', verifyToken, getPosts);
router.get('/blogs/:id', verifyToken, getPostById);
router.put('/blogs/:id', verifyToken, updatePost);
router.delete('/blogs/:id', verifyToken, deletePost);

export default router;
