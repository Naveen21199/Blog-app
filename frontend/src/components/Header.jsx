import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
function Header() {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      alert("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="navbar" style={{ backgroundColor: "#37517e" }}>
        <div className="container-fluid ">
          <Link to="/my-blogs" className="navbar-brand text-white">
            ER BLOGS
          </Link>

          {isLogin && (
            <div>
              <Link to="/blogs" className="btn text-white">
                BLOGS
              </Link>
              <Link to="/my-blogs" className="btn text-white">
                MYBLOGS
              </Link>
              <Link to="/create-blog" className="btn text-white">
                CREATE BLOG
              </Link>
            </div>
          )}
          <div className="d-flex">
            {!isLogin && (
              <>
                <Link className="btn text-white" to="/login">
                  Login
                </Link>
                <Link className="btn text-white" to="/register">
                  Register
                </Link>
              </>
            )}
            {isLogin && (
              <Link
                onClick={handleLogout}
                className="btn text-white"
                to="/login"
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
