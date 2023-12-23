require('dotenv').config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const connectDB = require('./db/db');
const productRouter = require('./routes/routesProduct');
const routesUser = require('./routes/routesUser');
const routesOrder = require('./routes/routesOrder');

const app = express();
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:7200',
    credentials: true
}));
// app.use(cors({
//     origin: 'http://localhost:7200',
//     credentials: true
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:7200');
    res.header('Access-Control-Allow-Credentials', true);
    next();
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