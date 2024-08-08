const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { connectDB } = require("./db/index");
// const { sendBatteryData, sendDrivingDistanceData, sendFuelConsumptionData, sendSpeedData, sendTemperatureData, sendWeatherData } = require('./sockets');
const mainRouter = require("./routes/index");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

app.use(express.json());


// app.use("/", mainRouter);

// const handleUnusedRoutes = (req, res, next) => {
//   const error = new Error(`Route not found: ${req.originalUrl}`);
//   error.status = 404;
//   next(error);
// };

// const errorHandler = (err, req, res, next) => {
//   res.status(err.status || 500).json({
//     error: {
//       message: err.message || "Internal Server Error",
//     },
//   });
// };
// app.use(handleUnusedRoutes);
// app.use(errorHandler);

const main = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => console.log("Server running on port " + PORT));
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

main();
