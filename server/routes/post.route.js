import { Router } from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", isLoggedIn, getFeedPosts);
router.get("/:userId/posts", isLoggedIn, getUserPosts);

router.patch("/:id/like", isLoggedIn, likePost);

export default router;
