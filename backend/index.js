import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import legislationRoutes from "./routes/legislation.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "1kb" }));
app.use(cors());

const PORT = process.env.PORT || 5000;

// Set up mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Set up routes
app.use("/api/legislation", legislationRoutes);

app.listen(PORT, () => console.log(`The server is on: https://localhost:${PORT}`));