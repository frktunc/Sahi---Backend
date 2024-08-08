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

function sendstripCamera(socket) {
  const statuses = ["Kamera sorunu !!!", "Kamera sorunsuz çalışıyor"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  const status = statuses[randomIndex];
  socket.emit("stripCamera", status);
}

function sendsplateCamera(socket) {
  const statuses = ["Kamera sorunu !!!", "Kamera sorunsuz çalışıyor"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  const status = statuses[randomIndex];
  socket.emit("plateCameraaaaa", status);
}

function sendUltrasonicSensor(socket) {
  const statuses = ["Sensör sorunu !!!", "Sensör sorunsuz çalışıyor"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  const status = statuses[randomIndex];
  socket.emit("UltrasonicSensor", status);
}

function sendWeatherData(socket) {
  const weatherConditions = ["Güneşli", "Bulutlu", "Yağmurlu"];
  const weather =
    weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
  socket.emit("weather", weather);
}

function sendBatteryData(socket) {
  const battery = Math.floor(Math.random() * 101);
  socket.emit("batteryPercentage", battery);
}

// Yakıt tüketimi verisi gönder
function sendFuelConsumptionData(socket) {
  const fuelConsumption = (Math.random() * 15 + 5).toFixed(2);
  socket.emit("fuelConsumption", fuelConsumption);
}

// Sürüş mesafesi verisi gönder
function sendDrivingDistanceData(socket) {
  const drivingDistance = Math.floor(Math.random() * 201);
  socket.emit("drivingDistance", drivingDistance);
}

// Hız verisi gönder
function sendSpeedData(socket) {
  const speed = Math.floor(Math.random() * 101);
  socket.emit("speed", speed);
}
function sendTemperatureData(socket) {
  const temperatursse = (Math.random() * 100).toFixed(2);
  socket.emit("temperature", temperatursse);
}

io.on("connection", (socket) => {
  console.log("Şahi Otonom / Kaptanım Çok Yaşa :)");

  sendstripCamera(socket);
  setInterval(() => {
    sendstripCamera(socket);
  }, 5000);

  sendsplateCamera(socket);
  setInterval(() => {
    sendsplateCamera(socket);
  }, 5000);

  sendUltrasonicSensor(socket);
  setInterval(() => {
    sendUltrasonicSensor(socket);
  }, 5000);

  sendTemperatureData(socket);
  setInterval(() => {
    sendTemperatureData(socket);
  }, 1000);

  sendWeatherData(socket);
  setInterval(() => {
    sendWeatherData(socket);
  }, 5000);

  sendFuelConsumptionData(socket);
  setInterval(() => {
    sendFuelConsumptionData(socket);
  }, 10000);

  sendDrivingDistanceData(socket);
  setInterval(() => {
    sendDrivingDistanceData(socket);
  }, 15000);

  sendSpeedData(socket);
  setInterval(() => {
    sendSpeedData(socket);
  }, 2000);

  sendBatteryData(socket);
  setInterval(() => {
    sendBatteryData(socket);
  }, 5000);
});

app.use("/", mainRouter);

const handleUnusedRoutes = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
};
app.use(handleUnusedRoutes);
app.use(errorHandler);

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
