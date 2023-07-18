
const Product = require("../models/product");


const asyncWrapper = require("../middleware/async");;


const createProduct = asyncWrapper(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
})
const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({ products });
}

module.exports = { getAllProducts, createProduct };