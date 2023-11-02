import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import fs from "fs";

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
    const uId = user._id;
    const { profilePicture } = req.files;

    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    if (profilePicture && profilePicture.size > 200000)
      return res
        .status(500)
        .json({ message: "Profile picture should be less than 2 mb" });

    const updatedData = await userModel.findByIdAndUpdate(
      uId,
      { name, email, password: hashedPassword },
      { new: true }
    );

    if (profilePicture) {
      updatedData.profilePicture.data = fs.readFileSync(profilePicture.path);
      updatedData.profilePicture.contentType = profilePicture.type;
    }

    await updatedData.save();
    res.status(200).json({
      success: true,
      message: "Data updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating data",
    });
  }
};
