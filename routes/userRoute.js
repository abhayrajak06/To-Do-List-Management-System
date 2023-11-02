import express from "express";
import { getUserData, updateUserData } from "../controllers/userController.js";
import formidable from "express-formidable";

const router = express.Router();

//user details || GET
router.get("/my-details", getUserData);

//user details update || POST
router.put("/update-details", formidable(), updateUserData);

export default router;
