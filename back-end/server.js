const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workOut");
const userRoutes = require("./routes/user");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(`${process.env.MONGO_URL}workout?authSource=admin`)
  .then(() => {
    console.log("db connected");
    app.listen(process.env.PORT, () => {
      console.log(`server listening in port ${process.env.PORT} ...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("hello server");
});

app.use("/api", workoutRoutes);
app.use("/api/user", userRoutes);
