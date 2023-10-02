import axios from "axios";
import _ from "lodash";

async function fetchBlogs() {
  try {
    const response = await axios.get(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      {
        headers: {
          "x-hasura-admin-secret":
            "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
        },
      }
    );
    return response.data.blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    throw new Error("Error fetching blogs");
  }
}

const memoizedFetchBlogs = _.memoize(fetchBlogs);

export default memoizedFetchBlogs;
