require("dotenv").config();
const express = require("express");
const router = express.Router();
const path = require('path');
const mongoose = require("mongoose");
const app = express();
const routesURLs = require('./routes/routes');
const cors = require('cors');
const PORT= process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err)); 

app.use(express.json());
app.use(cors());  
app.use('/api', routesURLs);

// if (process.env.NODE_ENV === "production"){
//   app.use(express.static(path.join(__dirname, "../frontend/build")));
//   app.get("*", (req,res) => {
//     res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
//   })
// }else{
//   app.get('/', (req,res) => {
//     res.send("Api running");
//   })
// }

app.get('/', (req,res) => {
    res.send("Api running");
  })
app.listen(PORT, () => console.log(`Server listening on Port ${PORT}`));  


