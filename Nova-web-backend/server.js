require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log('DataBase connected Successfully'));

const authRoutes = require("./routes/auth-route");
const kycRoutes = require("./routes/kyc-route");

const frontendURI = "http://localhost:5173";

app.use(bodyParser.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: frontendURI, // Replace with your frontend domain
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
app.use("/auth", authRoutes);
app.use("/kyc", kycRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
