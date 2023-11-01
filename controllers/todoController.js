import todoModel from "../models/todoModel.js";
import userModel from "../models/userModel.js";

export const createTodoController = async (req, res) => {
  try {
    const { title, description, dueDate, category, priority, status } =
      req.body;
    const email = req.headers.authorization;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authorized",
      });
    }

    const todo = new todoModel({
      title,
      description,
      dueDate,
      category,
      priority,
      status,
      user: user._id,
    });

    await todo.save();

    user.todos.push(todo);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Todo created successfully",
      todo: todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating todo",
    });
  }
};

export const readTodoController = async (req, res) => {
  try {
    const email = req.headers.authorization;
    const user = await userModel.findOne({ email });
    const todos = await todoModel.find({ user: user });

    res.status(200).json({
      success: true,
      message: "Getting todos",
      todos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting todos",
    });
  }
};

export const updateTodoController = async (req, res) => {
  try {
    const { tId } = req.params;
    const { title, description, dueDate, category, priority, status } =
      req.body;

    const todo = await todoModel.findByIdAndUpdate(
      tId,
      { title, description, dueDate, category, priority, status },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating todo",
    });
  }
};

export const deleteTodoController = async (req, res) => {
  try {
    const { tId } = req.params;
    const deletedTodo = await todoModel.findByIdAndDelete(tId);

    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting todo",
    });
  }
};

export const getSingleTodoController = async (req, res) => {
  try {
    const { tId } = req.params;
    const email = req.headers.authorization;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not authorized",
      });
    }

    const todo = await todoModel.findOne({ _id: tId });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Single todo retrieved successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting single todo",
    });
  }
};
