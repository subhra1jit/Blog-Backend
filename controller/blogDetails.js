import _ from "lodash";
import memoizedFetchBlogs from "../caches/memorizedBlogData.js";
import memoizedFetchSearchBlogs from "../caches/memorizedSearchBlogData.js";

export const blogStates = async (req, res) => {
  try {
    const blogs = await memoizedFetchBlogs();

    const totalBlogs = blogs.length;
    const longestBlog = _.maxBy(blogs, "title.length");
    const privacyBlogs = _.filter(blogs, (blog) =>
      blog.title.toLowerCase().includes("privacy")
    ).length;
    const uniqueTitles = _.uniqBy(blogs, "title");

    res.status(201).json({
      totalblogs: totalBlogs,
      longestBlogTitle: longestBlog.title,
      privacyBlogs: privacyBlogs,
      uniqueTitles: uniqueTitles,
    });
  } catch (error) {
    console.error("Error fetching or analyzing data:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};

export const searchedPost = async (req, res) => {
  try {
    const query = req.query.query.toLowerCase();
    if (!query) {
      return res.status(400).json({
        message: "please provide a valid search field ",
      });
    }

    const blogs = await memoizedFetchBlogs();

    const filteredBlog = await memoizedFetchSearchBlogs(blogs, query);

    res.status(201).json({
      filteredBlog,
    });
  } catch (error) {
    console.error("Error occurred during search:", error.message);
    res.status(500).json({ error: "An error occurred during the search." });
  }
};
