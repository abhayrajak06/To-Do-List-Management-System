import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../components/context/auth";
import Layout from "../components/Layout";

const Notifications = () => {
  const [auth] = useAuth();
  const [todos, setTodos] = useState([]);
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

  const today = new Date();

  useEffect(() => {
    allTodos();
  }, []);

  useEffect(() => {
    const sortTodos = todos.filter((todo) => {
      const todoDueDate = new Date(todo.dueDate);
      return todo.status === "Pending" && todoDueDate < today;
    });
    setSortedTodos(sortTodos);
  }, [todos]);

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
          <div
            className="col-md-12"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h4 className="text-center mt-3">Due Todos</h4>
            <div
              className=" mt-3"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                flexWrap: "wrap",
                minWidth: "70%",
                backgroundColor: "greenyellow",
                padding: "1rem",
                borderRadius: "1rem",
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
                      <span>Due Date: {formatDate(t.dueDate)} </span>
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

export default Notifications;
