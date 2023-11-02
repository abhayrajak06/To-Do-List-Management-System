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
import UpdateTodo from "./pages/Todo/UpdateTodo";
import Categories from "./pages/Categories";
import CategoryTodos from "./pages/CategoryTodos";
import InProgressTodos from "./pages/Todo/InProgressTodos";
import ScrollToTop from "react-scroll-to-top";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-todo" element={<CreateTodo />} />
        <Route path="/inprogress-todos" element={<InProgressTodos />} />
        <Route path="/pending-todos" element={<PendingTodos />} />
        <Route path="/completed-todos" element={<CompletedTodos />} />
        <Route path="/all-todos" element={<AllTodos />} />
        <Route path="/update-todo/:tId" element={<UpdateTodo />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:cName" element={<CategoryTodos />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
      <ScrollToTop smooth color="black" style={{ backgroundColor: "gray" }} />
      <Toaster />
    </>
  );
}

export default App;
