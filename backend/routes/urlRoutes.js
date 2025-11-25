import express from "express";
import { 
  createShortUrl, 
  redirectUrl, 
  getUserUrls, 
  deleteUrl 
} from "../controllers/urlController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/shorten", protect, createShortUrl);
router.get("/all", protect, getUserUrls);
router.delete("/:id", protect, deleteUrl);
router.get("/:shortId", redirectUrl);

export default router;
