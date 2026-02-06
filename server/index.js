// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // 👇 FORCE dotenv to read server/.env
// dotenv.config({ path: path.join(__dirname, ".env") });

// console.log("SUPABASE_URL =", process.env.SUPABASE_URL);
// console.log("SUPABASE_SERVICE_KEY loaded =", !!process.env.SUPABASE_SERVICE_KEY);



import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import supabase from "./supabaseClient.js";
import upload from "./uploadMiddleware.js";
import Dataset from "./models/Dataset.js";

const app = express();
app.use(cors());
app.use(express.json());

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);

mongoose.connect("mongodb://127.0.0.1:27017/astrofusion");

const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// JWT AUTH MIDDLEWARE
function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");

    req.user = decoded; 
    // { userId: "mongoId" }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// SIGNUP
app.post("/auth/signup", async (req, res) => {
  const { email, username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, username, password: hashed });

  res.json({ message: "User created" });
});

// LOGIN
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { userId: user._id },
    "SECRET_KEY",
    { expiresIn: "1d" }
  );

  res.json({ token });
});

app.post("/upload", auth, upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user.userId; // TEMP — send from frontend

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!userId) {
      return res.status(400).json({ message: "UserId missing" });
    }

    /**
     * Unique filename
     */
    const timestamp = Date.now();
    const storedFileName = `${timestamp}_${file.originalname}`;

    /**
     * USER-WISE STORAGE PATH
     * datasets/userId/raw/file.xlsx
     */
    const filePath = `${userId}/raw/${storedFileName}`;

    /**
     * Upload to Supabase
     */
    const { error } = await supabase.storage
      .from("datasets")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return res.status(500).json({ message: "Upload failed" });
    }

    /**
     * Save metadata in Mongo
     */
    const dataset = await Dataset.create({
      userId,

      fileName: file.originalname,
      fileType: file.mimetype,
      fileSize: file.size,

      rawFile: {
        bucket: "datasets",
        path: filePath,
      },
    });

    /**
     * Response
     */
    res.json({
      message: "File uploaded successfully",
      dataset,
    });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () =>
  console.log("Auth server running on port 5000")
);
