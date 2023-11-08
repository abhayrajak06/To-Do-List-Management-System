import express from "express";
import { getUserData, updateUserData } from "../controllers/userController.js";

const router = express.Router();

//user details || GET
router.get("/my-details", getUserData);

//user details update || POST
router.put("/update-details", updateUserData);

export default router;
