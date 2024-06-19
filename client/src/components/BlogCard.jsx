import axios from "axios";
import { useNavigate } from "react-router-dom";

function BlogCard({ title, description, image, time, id, isUser }) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/blog/delete-blog/${id}`
      );
      if (data?.success) {
        console.log("inside the blog card line 17 :", data.success);
        alert("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex justify-content-center mb-1">
      <div className="card" style={{ width: "35rem" }}>
        {isUser && (
          <div
            className="d-flex justify-content-end align-items-center  "
            style={{ height: "3rem" }}
          >
            <h5>
              <i
                onClick={handleEdit}
                className="fa-solid fa-pen mx-2 text-primary"
              ></i>
            </h5>
            <h5>
              <i
                onClick={handleDelete}
                className="fa-solid fa-trash mx-2 text-danger "
              ></i>
            </h5>
          </div>
        )}
        <img src={image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Title : {title}</h5>
          <p className="card-text">Description : {description}</p>
          <a href="#" className="btn btn-primary">
            {time}
          </a>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
