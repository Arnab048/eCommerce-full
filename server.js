import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

// configure env
dotenv.config();

// cofigure database
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Learning Full MERN Project with Sannu</h1>");
});

// PORT
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
  console.log(
    `Server is Running on ${process.env.DEV_MODE} on the port ${PORT}`
  );
});
