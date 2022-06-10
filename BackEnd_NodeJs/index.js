require("dotenv").config();
const express = require("express");
var cors = require("cors");
const userRoute = require("./Routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(process.env.PORT);
app.use("/user", userRoute);

module.exports = app;
