import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { Toaster } from "react-hot-toast";
import CreateTodo from "./pages/Todo/CreateTodo";
import PendingTodos from "./pages/Todo/PendingTodos";
import CompletedTodos from "./pages/Todo/CompletedTodos";
import AllTodos from "./pages/Todo/AllTodos";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-todo" element={<CreateTodo />} />
        <Route path="/pending-todos" element={<PendingTodos />} />
        <Route path="/completed-todos" element={<CompletedTodos />} />
        <Route path="/all-todos" element={<AllTodos />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
