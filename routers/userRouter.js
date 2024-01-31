import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import {
  createGroup,
  getGroup,
  updateGroup,
} from "../controllers/groupController.js";
import { protect } from "../middleware/authMiddleware.js";
import { registerValidationMiddleware } from "../middleware/registerMiddleware.js";

const router = express.Router();

router.post("/", registerValidationMiddleware, registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/group").get(getGroup).put(createGroup);
router.post("/add", updateGroup);

export default router;
