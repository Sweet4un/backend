const app = require("./app");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const connectionDatabase = require("./config/database");
var os = require("os");
var hostname = os.hostname();
const cors = require("cors")

app.use(cors({origin: '*'}));

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
