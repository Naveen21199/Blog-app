import dotenv from "dotenv";
import connectDb from "./db/index.js";
import { app } from "./app.js";
import express from "express";

dotenv.config({
  path: "./.env",
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is runing at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongodb connection failed !!!", err);
  });
