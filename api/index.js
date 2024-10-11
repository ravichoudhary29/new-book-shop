const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const bookRoute = require("./routes/books");

dotenv.config();

const app = express();

app.get("/ravi", () => {
  console.log("ravi route");
});


mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to database."))
  .catch((err) => console.log("DB ERROR", err));
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute)

app.listen("8000", () => {
  console.log("server is running");
});
