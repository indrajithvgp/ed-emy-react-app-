import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const morgan = require("morgan");
require("dotenv").config();
import fs from "fs";

const app = express();

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((err) => console.log(err,"DB Connection Failed"));

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

fs.readdirSync("./routes").map((route) => {
  app.use("/api", require(`./routes/${route}`));
});

app.get("/", (req, res) => {
  res.send("");
});

const PORT = 8000 || process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log(`Server listening on ${PORT} ...`);
});
