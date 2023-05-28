// const express = require("express");
// const app = express();
// const errorMiddleware = require("./middleware/error");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const fileUpload = require("express-fileupload");
// const cors = require("cors")

// app.use(cors({
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });


// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());

// // Route Imports
// const product = require("./routes/productRoutes");
// const user = require("./routes/userRoutes");
// const order = require("./routes/orderRoutes");

// app.use("/api/v1", product);
// app.use("/api/v1", user);
// app.use("/api/v1", order);
// // Middleware for Errors
// app.use(errorMiddleware);

// module.exports = app;

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// const cors = require("cors");
// app.use(cors({ credentials: true, origin: "http://localhost:3002" }));

// config

// dotenv.config({ path: "backend/config/.env" });

const cors = require("cors")

// var corsOptions = {
//     origin: 'https://64738673ce74735ace3ac4dc--stately-meringue-8dd2a4.netlify.app',
//     optionsSuccessStatus: 200 // For legacy browser support
//     methods: "GET, PUT, DELETE, POST"
// }


// app.use(cors(corsOptions));

// app.use(cors({
//   origin: 'https://64738673ce74735ace3ac4dc--stately-meringue-8dd2a4.netlify.app',
//     methods: "GET, PUT, DELETE, POST",
//     optionsSuccessStatus: 200
// }));

// app.use(cors({
// //   origin: '*',
//     origin: 'https://64738673ce74735ace3ac4dc--stately-meringue-8dd2a4.netlify.app',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://64738673ce74735ace3ac4dc--stately-meringue-8dd2a4.netlify.app');
//   next();
// });


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;

