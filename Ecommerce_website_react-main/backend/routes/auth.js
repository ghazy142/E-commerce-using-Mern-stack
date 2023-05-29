import express from "express";
const router = express.Router();

import User from "../Models/User.js";

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username) return res.status(400).send("Username is required");
  if (!password) return res.status(400).send("Password is required");
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send("User does not exist");

  const isMatch = await user.checkPassword(password);
  if (!isMatch) return res.status(400).send("Invalid username or password");

  return res.send(user.genAuthToken());
});

export default router;
