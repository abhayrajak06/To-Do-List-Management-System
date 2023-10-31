import React from "react";
import Layout from "../../components/Layout";
import TodosMenu from "../../components/TodosMenu";

const AllTodos = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <TodosMenu />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">all</div>
        </div>
      </div>
    </Layout>
  );
};

export default AllTodos;
