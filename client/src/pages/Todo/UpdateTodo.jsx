import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import TodosMenu from "../../components/TodosMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../components/context/auth";

const UpdateTodo = () => {
  const { tId } = useParams();
  const [auth] = useAuth();

  const getTodoData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_PORT}/api/v1/todos/get-todo/${tId}`,
        {
          headers: {
            Authorization: `${auth?.user?.email}`,
          },
        }
      );
      if (data) {
        setTodo(data.todo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodoData();
  }, []);

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "Personal",
    priority: "Low",
    status: "In_progress",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const title = todo.title;
      const description = todo.description;
      const dueDate = todo.dueDate;
      const category = todo.category;
      const priority = todo.priority;
      const status = todo.status;
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_PORT}/api/v1/todos/update/${tId}`,
        { title, description, dueDate, category, priority, status },
        {
          headers: {
            Authorization: `${auth?.user?.email}`,
          },
        }
      );
      if (res?.data?.success) {
        toast.success("Todo updated successfully");
        navigate("/all-todos");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <TodosMenu />
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-12"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                minWidth: "18rem",
                padding: "1rem",
                margin: "1rem 0",
                borderRadius: "0.5rem",
                backgroundColor: "rgba(220, 182, 202, 0.8)",
              }}
            >
              <h2 className="text-center mb-2">Create Todo</h2>
              <div className="mb-3">
                <label htmlFor="exampleInputTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter title"
                  required
                  name="title"
                  value={todo.title}
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputTitle"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputDescription" className="form-label">
                  Description
                </label>
                <textarea
                  style={{ maxHeight: "10rem" }}
                  type="text"
                  placeholder="Enter description"
                  required
                  name="description"
                  value={todo.description}
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputDescription"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputdueDate" className="form-label">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={todo.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div
                className="mb-3"
                style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
              >
                <label>
                  Category:
                  <select
                    value={todo.category}
                    name="category"
                    onChange={handleChange}
                    required
                  >
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Home">Home</option>
                    <option value="Health and Fitness">
                      Health and Fitness
                    </option>
                    <option value="Education">Education</option>
                    <option value="Finance">Finance</option>
                    <option value="Social">Social</option>
                    <option value="Travel">Travel</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Hobbies">Hobbies</option>
                    <option value="Long-Term Goals">Long-Term Goals</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                  </select>
                </label>
                <label>
                  Priority:
                  <select
                    value={todo.priority}
                    name="priority"
                    onChange={handleChange}
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </label>
                <label>
                  Status:
                  <select
                    value={todo.status}
                    name="status"
                    onChange={handleChange}
                    required
                  >
                    <option value="In_progress">In-progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateTodo;
