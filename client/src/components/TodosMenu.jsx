import React from "react";
import { NavLink } from "react-router-dom";

const TodosMenu = () => {
  return (
    <div className="">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div
              className="menu mx-auto mt-3 p-3 w-75"
              style={{
                backgroundColor: "rgba(245, 198, 145, 0.8)",
                borderRadius: "0.5rem",
              }}
            >
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
                  <NavLink className="nav-link" to={"/create-todo"}>
                    Create Todo
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/inprogress-todos"}>
                    In Progress
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/pending-todos"}>
                    Pending
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/completed-todos"}>
                    Completed
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/all-todos"}>
                    All
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosMenu;
