import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../components/context/auth";

const Login = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useAuth();
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
      const email = details.email;
      const password = details.password;
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_PORT}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res?.data.success) {
        toast.success("Login Successfully");
        setAuth({
          ...auth,
          user: res?.data?.user,
          token: res?.data?.token,
        });
        localStorage.setItem("auth", JSON.stringify(res?.data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
  };

  return (
    <Layout>
      <div className="register">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-2">Login</h2>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              name="email"
              value={details.email}
              onChange={handleChange}
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
              required
              name="password"
              value={details.password}
              onChange={handleChange}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
