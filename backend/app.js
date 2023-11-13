require('dotenv').config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const connectDB = require('./db/db');
const productRouter = require('./routes/routesProduct');
const routesUser = require('./routes/routesUser');
const routesOrder = require('./routes/routesOrder');

const app = express();


// app.use(cors({
//     origin: 'http://localhost:7200', 
//     credentials: true, 
// }));
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: '*',
    // credentials: true,
    credentials: 'include',
    optionsSuccessStatus: 204,
}; 

app.use(cors(corsOptions));


app.use(cookieParser());

// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



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