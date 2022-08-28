require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err)); 

app.listen(5000, () => console.log("Server listening on Port 5000"))
// Router.get("/", async (req, res) => { 
//   try {
//   } catch (error) {}
// });
