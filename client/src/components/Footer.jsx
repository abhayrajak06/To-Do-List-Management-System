import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h5 className="text-center">
        Copyright &copy; {new Date().getFullYear()} To-Do
      </h5>
    </div>
  );
};

export default Footer;
