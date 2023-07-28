const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        // required: [true, 'product name must be provided']
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided']
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
    category: {
        type: String
    },
    shipping: {
        type: Boolean
    }

})
module.exports = mongoose.model("Product", ProductSchema);