import express from "express";
import { getUserData, updateUserData } from "../controllers/userController.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const email = req.headers.authorization; // User's ID as sent in the request headers
    const userFolderPath = `./client/src/assets/profilePics/${email}`;
    fs.mkdirSync(userFolderPath, { recursive: true });
    cb(null, userFolderPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// User details || GET
router.get("/my-details", getUserData);

// User details update || PUT
router.put("/update-details", updateUserData);

// Upload profile picture || POST
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const email = req.headers.authorization;
    const userFolderPath = `./client/src/assets/profilePics/${email}`;
    const files = fs.readdirSync(userFolderPath);

    // If there is an existing image, delete it
    if (files.length > 0) {
      const profilePicturePath = path.join(userFolderPath, files[0]);
      fs.unlinkSync(profilePicturePath);
    }

    // Copy and replace the new image
    const newImagePath = path.join(userFolderPath, req.file.filename);
    fs.copyFileSync(req.file.path, newImagePath);

    res.send("Profile Picture Updated");
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
