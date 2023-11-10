import express from "express";
import { getUserData, updateUserData } from "../controllers/userController.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./client/src/assets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

//user details || GET
router.get("/my-details", getUserData);

//user details update || POST
router.put("/update-details", updateUserData);

router.post("/upload-image", upload.single("image"), async (req, res) => {
  console.log(req.body);
  res.send("uploaded");
});

export default router;
