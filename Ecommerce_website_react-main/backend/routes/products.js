import express from "express";
const router = express.Router();
import Product from "../Models/Product.js";
import authMid from "../middlewares/auth.js";
import cloudinary from "../cloud.js";

import multer from "multer";
import { fileUpload } from "../multer.js";

router.get("/", async (req, res) => {
  const products = await Product.find();

  for (const product in products) {
    const { _id, title, about, img, price } = products[product];
    const viewProduct = { _id, title, about, img, price };
    products[product] = viewProduct;
  }

  return res.send(products);
});

router.get("/search", async (req, res) => {
  const keyword = req.query.q;
  console.log(keyword);

  if (!keyword) {
    return res.status(400).send("Search keyword is missing");
  }

  try {
    const products = await Product.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { about: { $regex: keyword, $options: "i" } },
      ],
    });

    if (products.length === 0) {
      return res.status(404).send("No products found for the given keyword");
    }

    return res.send(products);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Couldn't find a product with the given id");
    }

    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.post(
  "/",
  authMid,
  multer(fileUpload()).single("img"),
  async (req, res) => {
    const { title, about, img, price } = req.body;

    let product = new Product({
      title,
      about,
      img,
      price,
      user: req.user.username,
    });

    if (req.file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path
      );

      product.img = { secure_url, public_id };
    }

    if (req.user.admin) {
      product = await product.save();
      const { title, about, img, price } = product;
      const viewProduct = { title, about, img, price };
      return res.send(viewProduct);
    } else {
      return res
        .status(403)
        .send("You don't have permission to create a product");
    }
  }
);

router.put("/:id", authMid, async (req, res) => {
  const { id } = req.params;
  const { title, about, img, price } = req.body;

  if (!req.user.admin) {
    return res
      .status(403)
      .send("You don't have permission to update a product");
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, about, img, price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send("Couldn't find a product with the given id");
    }

    return res.send(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.delete("/:id", authMid, async (req, res) => {
  const { id } = req.params;

  if (!req.user.admin) {
    return res
      .status(403)
      .send("You don't have permission to delete a product");
  }

  try {
    const deletedProduct = await Product.findByIdAndRemove(id);

    if (!deletedProduct) {
      return res.status(404).send("Couldn't find a product with the given id");
    }

    return res.send(deletedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

export default router;
