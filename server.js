const app = require("./app");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const connectionDatabase = require("./database");
var os = require("os");
var hostname = os.hostname();
const cors = require("cors")

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

// app.use(cors({
//   origin: 'https://64738673ce74735ace3ac4dc--stately-meringue-8dd2a4.netlify.app',
//     methods: "GET, PUT, DELETE, POST",
//     optionsSuccessStatus: 200
// }));

app.use(cors({
  origin: '*'
}));



// handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to uncaught Exception...`);
  process.exit(1);
});

// dotenv config
dotenv.config({ path: "backend/config/.env" });

connectionDatabase();

cloudinary.config({cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET})

const server = app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
  console.log("listening on host", hostname);
});

// unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log("Error: ", err.message);
  console.log(`shutting down the server due to unhandled promise rejection...`);
  server.close(() => {
    process.exit(1);
  });
});
