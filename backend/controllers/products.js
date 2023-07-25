
const Product = require("../models/product");
const asyncWrapper = require("../middleware/async");;


const createProduct = asyncWrapper(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
});



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
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);


    const products = await result;
    console.log(req.query);
    res.status(200).json({ products, countProducts: products.length })

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