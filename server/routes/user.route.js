import { Router } from "express";
import {
  addRemoveFriend,
  getUser,
  getUserFriends,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/:id",  getUser);
router.get("/:id/friends", isLoggedIn, getUserFriends);

// update
router.patch("/:id/:friendId", isLoggedIn, addRemoveFriend);

export default router;
