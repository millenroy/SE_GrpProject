const express = require("express");
const userRouter = require("./routes/user");
const tollPlazaRouter = require("./routes/tollPlaza")
require("./db/db");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(tollPlazaRouter)
module.exports = app;
