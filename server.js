import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import todoRoute from "./routes/todoRoute.js";
import userRoute from "./routes/userRoute.js";

//config env
dotenv.config();

//config database
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/todos", todoRoute);
app.use("/api/v1/user", userRoute);
// app.get("/", (req, res) => {
//   res.send("hello");
// });

//listen
app.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
