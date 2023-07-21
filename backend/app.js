require('dotenv').config();

const express = require("express");
const cors = require("cors");

const connectDB = require('./db/db');
const productRouter = require('./routes/routesProduct');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>");
});


app.use('/api/products', productRouter);

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