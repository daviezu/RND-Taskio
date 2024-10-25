const mongoose = require("mongoose");
const express = require("express");

require("dotenv").config();

// routes
const userRoutes = require("./routes/user");

const app = express();

// connect do database
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Taskio");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on http://localhost:${process.env.PORT}`);
});
