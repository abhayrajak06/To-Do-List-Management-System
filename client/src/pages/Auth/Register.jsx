import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = details.name;
      const email = details.email;
      const password = details.password;
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_PORT}/api/v1/auth/register`,
        {
          name,
          email,
          password,
        }
      );
      if (res?.data.success) {
        toast.success("Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
    }
  };
  return (
    <Layout>
      <div className="register">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-2">Register</h2>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              placeholder="Enter your name"
              onChange={handleChange}
              required
              type="text"
              name="name"
              value={details.name}
              className="form-control"
              id="exampleInputName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              name="email"
              value={details.email}
              required
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              name="password"
              value={details.password}
              required
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
