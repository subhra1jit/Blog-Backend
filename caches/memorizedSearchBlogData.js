import _ from "lodash";

function customCacheKey(blogs, query) {
  return `${query}:${JSON.stringify(blogs)}`;
}

async function fetchSearchBlog(blogs, query) {
  try {
    console.log("data is being searched");
    const filteredBlog = _.filter(blogs, function (blog) {
      return blog.title.toLowerCase().includes(query);
    });
    return filteredBlog;
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    throw new Error("Error fetching searched blog");
  }
}

const memoizedFetchSearchBlogs = _.memoize(fetchSearchBlog, customCacheKey);

export default memoizedFetchSearchBlogs;
