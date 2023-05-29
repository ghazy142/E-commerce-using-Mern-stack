import express from "express";
const router = express.Router();
import authMid from "../middlewares/auth.js";

import Cart from "../Models/Cart.js";

router.get("/", authMid, async (req, res) => {
  const getCart = await Cart.find().populate("product");
  return res.status(200).json(getCart);
});

router.post("/add", authMid, async (req, res) => {
  try {
    const { order } = req.body;
    const userId = req.user._id; // Assuming the authenticated user's ID is available in req.user._id

    console.log(order.orderItems);
    console.log(userId);

    for (const orderItem of order.orderItems) {
      const { product } = orderItem;
      console.log(product);

      // Check if the product already exists in the user's cart
      const existingCartItem = await Cart.findOne({ user: userId, product });

      if (existingCartItem) {
        // If the product already exists, increment the quantity by 1
        existingCartItem.quantity++;
        await existingCartItem.save();
      } else {
        // If the product does not exist, create a new cart item with quantity = 1
        await Cart.create({ product, user: userId, quantity: 1 });
      }
    }

    return res.status(201).json({ message: "Order added to cart" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

export default router;
