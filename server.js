const express = require("express");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");
const tokenCleanup = require("./utils/tokenCleanup");
const bs = require("browser-sync").create();
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();
const usersRouter = require("./Router/users");

app.use(helmet());
app.use(express.json());

//CORS policies
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ROUTES
app.use("/user", usersRouter);

app.get("/", (req, res) => {
  res.send("Welcome to REST!");
});

app.use("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Wrong path",
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);

  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
  }

  if (!fs.existsSync(".env")) {
    fs.writeFileSync("./.env", "SALT=<salt>\nPORT=3002");
  }

  if (!fs.existsSync("./data/users.json")) {
    fs.writeFileSync("./data/users.json", JSON.stringify([]));
  }
  if (!fs.existsSync("./data/token.json")) {
    fs.writeFileSync("./data/token.json", JSON.stringify([]));
  }

  //   Cleaning up tokens every 3 minutes
  const interval = 1000 * 60 * 3;

  setInterval(() => {
    tokenCleanup();
  }, interval);
});
