import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BlogDetails() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const [inputs, setInputs] = useState({});
  // get blog details

  const getBlogDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/blog/get-blog/${id}`
      );
      if (data?.success) {
        setBlog(data.data);
        setInputs({
          title: data.data.title,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, [id]);

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
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/blog/update-blog/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      if (data?.success) {
        alert("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log("inside details line 61 :", blog);
  return (
    <>
      <div className="container ">
        <form onSubmit={handleSubmit}>
          <div className="mb-5 text-center">
            <h1 className="form-check-label" htmlFor="exampleCheck1">
              Update Blog
            </h1>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputText" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={inputs.title}
              onChange={handleChange}
              required
              id="exampleInputText"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={inputs.description}
              onChange={handleChange}
              required
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Image URL
            </label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={inputs.image}
              onChange={handleChange}
              required
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </>
  );
}

export default BlogDetails;
