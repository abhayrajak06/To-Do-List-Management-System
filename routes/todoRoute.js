import express from "express";
import {
  createTodoController,
  deleteTodoController,
  readTodoController,
  updateTodoController,
} from "../controllers/todoController.js";

//router object
const router = express.Router();

//add todo || POST
router.post("/create", createTodoController);

//read todo || GET
router.get("/all-todos", readTodoController);

//update todo || PUT
router.put("/update/:tId", updateTodoController);

//delete todo || DELETE
router.delete("/delete/:tId", deleteTodoController);

export default router;
