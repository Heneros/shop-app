require('dotenv').config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const connectDB = require('./db/db');
const productRouter = require('./routes/routesProduct');
const routesUser = require('./routes/routesUser');
const routesOrder = require('./routes/routesOrder');
const routeUpload = require('./routes/routeUpload');


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



// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:7200');
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
// });

// if (!global.__dirname) {
//     global.__dirname = path.resolve();
// }
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// app.use('/uploads', express.static(path.join(process.cwd(), '/uploads')));






app.use('/api/products', productRouter);
app.use('/api/users', routesUser);
app.use('/api/orders', routesOrder);
app.use('/api/upload', routeUpload);



// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}



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