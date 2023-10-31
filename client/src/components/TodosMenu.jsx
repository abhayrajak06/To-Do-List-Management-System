import React from "react";
import { NavLink } from "react-router-dom";

const TodosMenu = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="menu mt-5">
              <ul
                className="navbar-nav   mb-2 mb-lg-0"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={"/create-todo"}
                    // activeClassName="active"
                  >
                    Create Todo
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={"/pending-todos"}
                    // activeClassName="active"
                  >
                    Pending
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={"/completed-todos"}
                    // activeClassName="active"
                  >
                    Completed
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={"/all-todos"}
                    // activeClassName="active"
                  >
                    All
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodosMenu;
