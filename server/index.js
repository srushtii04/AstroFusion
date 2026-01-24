import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/astrofusion");

const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

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

app.listen(5000, () =>
  console.log("Auth server running on port 5000")
);
