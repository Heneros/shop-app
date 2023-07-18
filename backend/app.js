require('dotenv').config();

const express = require("express");
const connectDB = require('./db/db');
const app = express();
// app.use('/', )

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