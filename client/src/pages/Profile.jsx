import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useAuth } from "../components/context/auth";
import toast from "react-hot-toast";

const Profile = () => {
  const [auth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [pic, setPic] = useState("");

  const getUserData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_PORT}/api/v1/user/my-details`,
      {
        headers: {
          Authorization: `${auth?.user?.email}`,
        },
      }
    );

    if (data) {
      setName(data?.user?.name);
      setEmail(data?.user?.email);
      setPic(data?.user?.profilePicture?.data);
      // console.log(data);
      console.log(data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const { data } = await axios.put(
        `${import.meta.env.VITE_REACT_APP_PORT}/api/v1/user/update-details`,
        formData,
        {
          headers: {
            Authorization: `${auth?.user?.email}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
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
            >
              {pic ? (
                <img
                  src={pic}
                  style={{
                    width: "18rem",
                    height: "18rem",
                    borderRadius: "40rem",
                  }}
                  alt="Profile"
                />
              ) : (
                <p>No image selected</p>
              )}
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
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
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
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
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
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="profile">Profile</label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                    id="profile"
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
