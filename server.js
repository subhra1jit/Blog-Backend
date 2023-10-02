import express from "express";
import { allErrorHandler } from "./middleware/error.js";
import Blog from "./routes/blog.js";

const app = express();

app.use("/", Blog);
app.use(allErrorHandler);

app.listen(4000, (req, res) => {
  console.log("the server is started");
});
