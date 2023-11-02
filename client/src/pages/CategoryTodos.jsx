import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../components/context/auth";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const CategoryTodos = () => {
  const [auth] = useAuth();
  const { cName } = useParams();

  const [todos, setTodos] = useState([]);
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

  useEffect(() => {
    allTodos();
  }, [todos]);

  const catTodo = todos.filter((todo) => todo.category === cName);

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
            <h1 className="text-center mt-2">{cName} Todos</h1>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem",
                justifyContent: "center",
              }}
            >
              {catTodo?.length ? (
                catTodo?.map((t) => (
                  <div
                    key={t._id}
                    className="p-2 card mb-3 mt-3"
                    style={{ width: "18rem" }}
                  >
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
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
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
                ))
              ) : (
                <div
                  className=""
                  style={{
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h4 className="text-center p-3 bg-danger">
                    There is no todo in {cName} category
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryTodos;
