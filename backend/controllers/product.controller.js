import Product from "../model/product.model.js";
import { mongoose } from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fetching products:", error);
    res
      .status(500)
      .json({ success: false, message: "Error in fetching products" });
  }
};

export const postProduct = async (req, res) => {
  const product = req.body; // user will send data

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newProduct = new Product(product); // create a new product

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product:", error);
    res
      .status(500)
      .json({ success: false, message: "Error in creating product" });
  }
};

export const putProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in updating product:", error);
    res
      .status(500)
      .json({ success: false, message: "Error in updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in deleting product:", error);
    res
      .status(500)
      .json({ success: false, message: "Error in deleting product" });
  }
};
