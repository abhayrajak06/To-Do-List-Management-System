import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import TodosMenu from "../../components/TodosMenu";
import axios from "axios";
import { useAuth } from "../../components/context/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AllTodos = () => {
  const [auth] = useAuth();
  const [todos, setTodos] = useState([]);
  const [sortPriority, setSortPriority] = useState("All");
  const [sortDueDate, setSortDueDate] = useState("sooner");
  const [sortedTodos, setSortedTodos] = useState([]);

  const allTodos = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_PORT}/api/v1/todos/all-todos`,
      {
        headers: {
          Authorization: `${auth?.user?.email}`,
        },
      }
    );
    if (data?.todos) {
      setTodos(data?.todos);
    }
  };

  const navigate = useNavigate();

  const handleDelete = async (tId) => {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_REACT_APP_PORT}/api/v1/todos/delete/${tId}`
    );
    if (data?.success) {
      toast.success("Todo deleted successfully");
      navigate("/all-todos");
    }
  };

  const sortTodos = () => {
    let sorted = todos.filter((todo) => todo.status === "Completed");

    if (sortPriority !== "All") {
      sorted = sorted.filter((todo) => todo.priority === sortPriority);
    }

    if (sortDueDate === "sooner") {
      sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else {
      sorted.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    }

    setSortedTodos(sorted);
  };

  useEffect(() => {
    allTodos();
  }, [todos]);

  useEffect(() => {
    sortTodos();
  }, [sortPriority, sortDueDate, todos]);

  function formatDate(dueDate) {
    const date = new Date(dueDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <TodosMenu />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div
              className="w-50 mx-auto"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                flexWrap: "wrap",
                backgroundColor: "rgba(218, 175, 126, 0.8)",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                alignItems: "center",
              }}
            >
              <label>
                Sort By Priority:
                <select
                  value={sortPriority}
                  onChange={(e) => setSortPriority(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>
              <label>
                Sort By Due Date:
                <select
                  value={sortDueDate}
                  onChange={(e) => setSortDueDate(e.target.value)}
                >
                  <option value="sooner">Sooner to Later</option>
                  <option value="later">Later to Sooner</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h4 className="text-center mt-2">All Todos</h4>
            <div
              className=" mt-3"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                flexWrap: "wrap",
              }}
            >
              {sortedTodos?.map((t) => (
                <div key={t._id} className="p-2 card mb-3 mt-3">
                  <div className="">
                    <h4>Title: {t.title}</h4>
                    <h5>Description: {t.description}</h5>
                    <p
                      className=""
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "3rem",
                      }}
                    >
                      <span>Due Date: {formatDate(t.dueDate)}</span>
                      <span>Category: {t.category}</span>
                    </p>
                    <p
                      className=""
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "3rem",
                      }}
                    >
                      <span>Priority: {t.priority}</span>
                      <span>Status: {t.status}</span>
                    </p>
                  </div>
                  <div
                    className=""
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <button className="btn btn-warning">
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/update-todo/${t._id}`}
                      >
                        Update
                      </Link>
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(t._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllTodos;
