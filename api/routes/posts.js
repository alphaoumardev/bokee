import express from "express";
import {
  deletePostController,
  getPostController,
  insertPostController,
  updatePostController,
  getSinglePostById,
} from "../controller/posts.js";

const router = express.Router();

router.get("/", getPostController);
router.post("/", insertPostController);
router.post("/:id", updatePostController);
router.get("/:id", getSinglePostById);
router.get("/:id", updatePostController);
router.delete("/:id", deletePostController);

export default router;
