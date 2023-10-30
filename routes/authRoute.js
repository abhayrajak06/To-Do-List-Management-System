import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

//router object
const router = express.Router();

//register || POST
router.post("/register", registerController);

//login || POST
router.post("/login", loginController);

export default router;
