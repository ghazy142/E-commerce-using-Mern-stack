import express from "express";
const router = express.Router();

import usersRouter from "./users.js";
import authRouter from "./auth.js";
import productsRouter from "./products.js";
import cartRouter from "./cart.js";

router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/cart", cartRouter);

export default function setupRoutes(app) {
  app.use("/api", router);
}
