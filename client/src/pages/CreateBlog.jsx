import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/blog/create-blog",
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      if (data?.success) {
        alert("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      // className="container-fluid mt-0 me-0 ms-0 "
      className="container-fluid mt-0"
      style={{ backgroundColor: "#37517e", height: "92vh" }}
    >
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-center">
            <h1 className="form-check-label text-white" htmlFor="exampleCheck1">
              Create A Blog
            </h1>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputText" className="form-label text-white">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              value={inputs.title}
              name="title"
              onChange={handleChange}
              required
              id="exampleInputText"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-white"
            >
              Description
            </label>
            <input
              type="text"
              className="form-control"
              value={inputs.description}
              name="description"
              onChange={handleChange}
              required
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-white"
            >
              Image URL
            </label>
            <input
              type="text"
              className="form-control"
              value={inputs.image}
              name="image"
              onChange={handleChange}
              required
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
