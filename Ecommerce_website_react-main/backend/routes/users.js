import express from "express";
const router = express.Router();
import User from "../Models/User.js";
import bcrypt from "bcryptjs";

router.post("/", async (req, res) => {
  let { username, password } = req.body;

  let user = await User.findOne({ username });

  if (user) return res.status(400).send("Username already taken");

  password = await bcrypt.hash(password, 10);

  user = new User({ username, password });
  await user.save();

  return res.send(user.genAuthToken());
});

export default router;
