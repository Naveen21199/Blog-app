import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  // state
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  // handle change inputs
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        }
      );
      if (data.success) {
        alert("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="container-fluid centered-form"
        style={{ backgroundColor: "#37517e" }}
      >
        <form className="border border-info rounded" onSubmit={handleSubmit}>
          <div className="mb-5 text-center">
            <h1 className="form-check-label text-white" htmlFor="exampleCheck1">
              Register
            </h1>
          </div>
          <div className="mb-3 text-center">
            <label htmlFor="exampleInputName" className="form-label text-white">
              Name
            </label>
            <input
              type="text"
              className="form-control border border-success-subtle rounded"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              id="exampleInputName"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 text-center">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-white"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control border border-success-subtle rounded"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 text-center">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label text-white"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control border border-success-subtle rounded"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              id="exampleInputPassword1"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary mb-4">
              Submit
            </button>
          </div>
          <div className="text-center mb-3 text-white ">
            <h6>
              <Link className="text-white" to="/login">
                ALREADY REGISTERED ? PLEASE LOGIN
              </Link>
            </h6>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
