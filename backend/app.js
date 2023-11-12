require('dotenv').config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require('./db/db');
const productRouter = require('./routes/routesProduct');
const routesUser = require('./routes/routesUser');
const routesOrder = require('./routes/routesOrder');

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>");
});


app.use('/api/products', productRouter);
app.use('/api/users', routesUser);
app.use('/api/orders', routesOrder);



const port = process.env.PORT || 4000;



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Working on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start();