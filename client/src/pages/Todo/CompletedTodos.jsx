import React from "react";
import Layout from "../../components/Layout";
import TodosMenu from "../../components/TodosMenu";

const CompletedTodos = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <TodosMenu />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">completed</div>
        </div>
      </div>
    </Layout>
  );
};

export default CompletedTodos;
