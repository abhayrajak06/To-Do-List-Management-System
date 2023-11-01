import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { catList } from "../utils/catList";

const Categories = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h4 className="text-center mt-2">All Categories</h4>
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                padding: "2rem",
                flexWrap: "wrap",
              }}
            >
              {catList?.map((cat) => (
                <Link
                  key={cat.id}
                  style={{
                    textDecoration: "none",
                    padding: "1rem",
                    backgroundColor: "orange",
                    color: "black",
                    fontWeight: "bold",
                    minWidth: "16rem",
                    borderRadius: "0.2rem",
                    textAlign: "center",
                  }}
                  to={`/categories/${cat.name}`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
