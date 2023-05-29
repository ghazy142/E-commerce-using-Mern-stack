import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  img: {
    type: Object,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    ref: "User",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
