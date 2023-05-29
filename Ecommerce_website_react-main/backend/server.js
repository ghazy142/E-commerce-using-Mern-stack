import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen to the server
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.use(express.json());
// routes
import routes from "./routes/index.js";
routes(app);
