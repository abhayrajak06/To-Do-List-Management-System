import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./context/auth";
import toast from "react-hot-toast";
import { IoIosNotifications } from "react-icons/io";

const Navbar = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    toast.success("Logout Successfully");
    localStorage.removeItem("auth");
  };
  return (
    <div style={{ position: "sticky", top: "0", zIndex: "100" }}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            style={{ fontWeight: "bold" }}
            to={"/"}
          >
            To-Do
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/"}>
                  Home
                </Link>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"/register"}
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"/login"}
                    >
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/create-todo"}
                    >
                      Your Todos
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/categories"}
                    >
                      Categories
                    </Link>
                  </li>

                  <li className="nav-item dropdown me-2">
                    <a
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to={"/my-profile"}>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          onClick={handleLogout}
                          // aria-current="page"
                          to={"/login"}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      className="nav-link"
                      style={{ marginRight: "2rem" }}
                      to={"/notifications"}
                    >
                      <IoIosNotifications size={30} />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
