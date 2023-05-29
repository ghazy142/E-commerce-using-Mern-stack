import jwt from "jsonwebtoken";
import config from "../config.js";
import User from "../Models/User.js";

const authMid = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }
  try {
    const user = jwt.verify(token, config.SECRET_KEY);
    req.user = await User.findById(user._id);
    next();
  } catch (err) {
    return res.status(401).send("Token is not valid");
  }
};

export default authMid;
