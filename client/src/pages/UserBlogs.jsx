import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

function UserBlogs() {
  const [blogs, setBlogs] = useState([]);

  // get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      console.log("User blog line 12 : ", localStorage.getItem("userId"));
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/blog/user-blog/${id}`
      );
      if (data?.success) {
        setBlogs(data.data.blogs);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserBlogs();
  }, []);
  return (
    <div style={{ backgroundColor: "#37517e", height: "100%" }}>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            key={blog.id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            time={blog.createdAt}
          />
        ))
      ) : (
        <div
          className="d-flex align-items-center justify-content-center alert alert-primary  "
          role="alert"
        >
          You have not created any blog yet !!
        </div>
      )}
    </div>
  );
}

export default UserBlogs;
