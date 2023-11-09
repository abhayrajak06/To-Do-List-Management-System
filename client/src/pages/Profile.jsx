import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useAuth } from "../components/context/auth";
import toast from "react-hot-toast";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState();

  const submitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post(
      `${import.meta.env.VITE_REACT_APP_PORT}/api/v1/user/upload-image`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };
  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_PORT}/api/v1/user/my-details`,
        {
          headers: {
            Authorization: `${auth?.user?.email}`,
          },
        }
      );

      if (data?.user) {
        setDetails({
          name: data.user.name,
          email: data.user.email,
          password: details.password,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_REACT_APP_PORT}/api/v1/user/update-details`,
        details,
        {
          headers: {
            Authorization: `${auth?.user?.email}`,
          },
        }
      );

      if (data?.success) {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.data = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update user profile");
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div
          className="row p-4"
          style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div
            className="col-md-4"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3 className="text-center">Profile Picture</h3>
            <div
              className="mt-5"
              style={{
                borderRadius: "60rem",
                height: "18rem",
                width: "18rem",
                backgroundColor: "gray",
              }}
            ></div>
            <div
              className=" p-3 mt-1"
              style={{ backgroundColor: "whitesmoke", borderRadius: "0.4rem" }}
            >
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
                onSubmit={submitImage}
              >
                <input type="file" accept="image/*" onChange={onInputChange} />
                <button type="submit" className="btn w-50 btn-primary">
                  Update Picture
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-7">
            <h2 className="text-center">My Profile</h2>
            <div
              className=""
              style={{ display: "flex", justifyContent: "center" }}
            >
              <form
                onSubmit={handleSubmit}
                className=" mt-3"
                style={{
                  backgroundColor: "gray",
                  padding: "2rem",
                  borderRadius: "0.5rem",
                  minWidth: "18rem",
                }}
              >
                <div className="mb-3">
                  <label htmlFor="exampleInputName" className="form-label">
                    Name
                  </label>
                  <input
                    placeholder="Enter your name"
                    onChange={handleChange}
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
                    value={details.email}
                    name="email"
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
                    placeholder="Enter new password"
                    onChange={handleChange}
                    value={details.password}
                    name="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
