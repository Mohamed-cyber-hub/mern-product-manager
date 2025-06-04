import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => { 
    try {
        const products = await Product.find({});
        res.status(200).json({ products, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", success: true, product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const updateProduct = async (req, res) => { 
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid product ID", success: false });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ message: "Product updated successfully", success: true, product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}

export const deleteProduct = async (req, res) => { 
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Invalid product ID", success: false });
        }
        if (!product) {
            return res.status(500).json({ message: "Product not found", success: false });
        }
        res.status(200).json({ message: "Product deleted successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}