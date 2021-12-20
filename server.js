const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const homeRoute = require("./routes/routes");
const carRoutes = require("./routes/carRoutes");
const customerRoutes = require("./routes/customerRoutes");
const rentRoutes = require("./routes/rentRoutes");
const vehicleRoute = require("./routes/vehicleTypeRoute");

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.use("/login", homeRoute);
app.use("/cars", carRoutes);
app.use("/rent", rentRoutes);
app.use("/customers", customerRoutes);
app.use("/vehicle-type", vehicleRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server is up and running at port ${PORT}`));
