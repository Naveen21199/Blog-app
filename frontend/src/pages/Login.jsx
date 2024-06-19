import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // state
  const [inputs, setInputs] = useState({
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
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        {
          email: inputs.email,
          password: inputs.password,
        }
      );
      if (data.success) {
        localStorage.setItem("userId", data?.data._id);
        dispatch(authActions.login());
        alert("User login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="container-fluid centered-form "
        style={{ backgroundColor: "#37517e" }}
      >
        <form className="border border-info rounded" onSubmit={handleSubmit}>
          <div className="mb-5 text-center">
            <h1 className="form-check-label text-white" htmlFor="exampleCheck1">
              Login
            </h1>
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
          <div className="text-center mb-3 text-primary text-white">
            <h6 onClick={() => navigate("/register")}>
              Not a user ? Please Register
            </h6>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
