const express = require("express");
const helmet = require("helmet");

const app = express();
const authenticationRouter = require("./Router/auth");

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authenticationRouter);

app.use("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
