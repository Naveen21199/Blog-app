import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  //get blogs
  const getAllBogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/blog/all-blog"
      );

      if (data?.success) {
        setBlogs(data.data);
        console.log(localStorage.getItem("userId"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBogs();
  }, []);
  return (
    <div className="h-auto" style={{ backgroundColor: "#37517e" }}>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog.user?._id}
            key={blog?.id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            time={blog?.createdAt}
          />
        ))}
    </div>
  );
}

export default Blogs;
