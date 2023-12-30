const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'must provide name'],
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided'],
        default: 0,
    },
    rating: {
        type: Number,
    },
    company: {
        type: String,
        // enum: {
        //     values: ['companyNameFirst', 'companyNameSecond'],
        // }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    imageUrl: {
        type: String,
    },
    categories: {
        type: Array,
        default: []
    },
    shipping: {
        type: Boolean
    },
    qty: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
}
)
module.exports = mongoose.model("Product", ProductSchema);