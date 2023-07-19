
const Product = require("../models/product");


const asyncWrapper = require("../middleware/async");;


const createProduct = asyncWrapper(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
});



const getAllProducts = asyncWrapper(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({ products });
})

const getProduct = asyncWrapper(async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
        return res.status(404).json({ msg: `Not found product ${productId}` })
    }
    res.status(200).json({ product })
});


const deleteProduct = asyncWrapper(async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOneAndDelete({ _id: productId })
    if (!product) {
        return res.status(404).json({ msg: `Not found product ${productId} to delete` });
    }
    res.status(200).json({ product })
});


const updateProduct = asyncWrapper(async (req, res) => {
    const { id: productId } = req.params;

    const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!product) {
        res.status(404).json({ msg: ` product not found.  Id ${productId} ` });;
    }
    res.status(200).json({ msg: `Id product been updated ${productId} ` });;
})

module.exports = { getAllProducts, createProduct, getProduct, deleteProduct, updateProduct };