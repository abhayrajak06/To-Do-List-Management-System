import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) return res.send({ message: "Name is required" });
    if (!email) return res.send({ message: "Email is required" });
    if (!password) return res.send({ message: "Password is required" });

    //checking existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exist, Please login...",
      });
    }

    //hashing the password
    const hashedPassword = await hashPassword(password);

    //saving the records
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(200).json({
      success: true,
      message: "Register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while register",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    //checking user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User not registered",
      });
    }

    //match the password
    const match = await comparePassword(password, user?.password);
    if (!match) {
      return res.status(500).json({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = await JWT.sign({ _id: user?._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: {
        name: user?.name,
        email: user?.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while login",
      error,
    });
  }
};
