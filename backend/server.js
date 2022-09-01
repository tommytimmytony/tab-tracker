require("dotenv").config();
const express = require("express");
const router = express.Router();
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
app.listen(PORT, () => console.log(`Server listening on Port ${PORT}`));  

