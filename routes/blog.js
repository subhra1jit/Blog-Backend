import express from "express";
import { blogStates, searchedPost } from "../controller/blogDetails.js";

const Blog = express.Router();

Blog.get("/api/blog-stats", blogStates);

Blog.get("/api/blog-search", searchedPost);

export default Blog;
