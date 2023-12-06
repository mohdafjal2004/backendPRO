// require('dotenv').config({path : "./env"})
import dotenv from "dotenv";

import express from "express";
import connectDB from "./db/index.js";
const app = express();

dotenv.config({
  path: "./env",
});


//* On successful connection to MongoDB Database start the Express server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at ${process.env.PORT}`)
    });
  })
  .catch((err) => {
    console.log("MoongDB connection failed !!!", err);
  });
