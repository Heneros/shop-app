
const Product = require("../models/product");
const asyncWrapper = require("../middleware/async");;


const createProduct = asyncWrapper(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        shipping: true,
        rating: 5,
        shipping: true,
        imageUrl: '/images/sample.jpeg',
        categories: ['Sample Brand'],
        qty: 0
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});


const getLastFilters = async (req, res) => {
    try {
        const products = await Product.find().exec();
        const filters = products.map((obj) => obj.categories).flat().slice(0, 15) //получение из объекта products все категории.
        res.status(201).json(filters);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to fetch filters.',
        });
    }
};


const getAllProducts = asyncWrapper(async (req, res) => {
    const { name, price, company, sort, rating, numFilters, fields } = req.query;
    const queryObject = {};

    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 1 };
    }
    if (numFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eg',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        )
        ///Например, если numFilters равно "price>50,rating>=4.5", то метод .replace выполнит следующие замены:
        //             > заменяется на -$gt -
        // >= заменяется на - $gte -
        // = заменяется на - $eq -
        //         В результате получим строку "price-$gt-50,rating-$gte-4.5".Это позволяет преобразовать операторы сравнения в формат, который будет использован для дальнейшего разделения и обработки фильтров.

        const options = ['price', 'rating'];

        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {/// проверяет options (['price', 'rating']) имя поля field
                queryObject[field] = { [operator]: Number(value) } /// это переменная, содержащая название поля (например, "price" или "rating"), к которому мы хотим применить фильтр. { [operator]: Number(value) }: Здесь operator - это переменная, содержащая оператор сравнения, например, "$gt" (больше), "$lt" (меньше), "$eq" (равно) и т.д. value - это переменная, содержащая значение, с которым мы хотим сравнивать поле field.
            }
        })
    }

    // const products = await Product.find(queryObject);
    let result = Product.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }
    if (fields) {
        const fieldList = sort.split(',').join(' ');
        result = result.select(fieldList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 25;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);


    const products = await result;
    // console.log(req.query);
    res.status(200).json(products)
    // res.status(200).json({ products, countProducts: products.length })

    // const products = await Product.find({});
    // res.status(200).json({ products });

});


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
    const { name, price, shipping, imageUrl, categories, qty } = req.body;

    const product = await Product.findById(req.params.id);


    if (product) {
        product.name = name;
        product.price = price;
        product.shipping = shipping;
        product.imageUrl = imageUrl;
        product.categories = categories;
        product.qty = qty;
        // product.user = req.user._id; 

        const updatedProduct = await product.save();
        res.json(updatedProduct);

    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

const createProductReview = asyncWrapper(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
})


module.exports = { getAllProducts, createProduct, getProduct, deleteProduct, updateProduct, getLastFilters };