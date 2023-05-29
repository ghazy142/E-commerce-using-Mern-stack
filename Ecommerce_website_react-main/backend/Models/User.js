import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import config from "../config.js";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const schema = new Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 25,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 300,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

schema.methods.genAuthToken = function () {
  return jwt.sign(this.toJSON(), config.SECRET_KEY);
};

schema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", schema);

export default User;
