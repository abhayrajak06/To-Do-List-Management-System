import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const email = req.headers.authorization;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(402).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting user data",
    });
  }
};

export const updateUserData = async (req, res) => {
  try {
    const authEmail = req.headers.authorization;
    const user = await userModel.findOne({ email: authEmail });
    const uId = user?._id;

    const { name, email, password } = req.body;

    //password
    if (password && password.length < 6) {
      return res.json({ message: "Password should be 6 character long" });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      uId,
      {
        name: name || user?.name,
        email: email || user?.email,
        password: hashedPassword || user?.password,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Data updated successfully",
      user,
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating data",
    });
  }
};
