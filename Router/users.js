const router = require("express").Router();
const fs = require("fs");
const crypto = require("crypto");

const SALT = process.env.SALT; //salt

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  //   Hashing the password with salt
  const hashPassword = crypto
    .createHash(`sha256`)
    .update(`${password}.${SALT}`)
    .digest(`hex`);

  // Extracting users from the file
  const usersBuffer = fs.readFileSync("./data/users.json");
  const users = JSON.parse(usersBuffer);

  if (!users.some((user) => user.username === username)) {
    const token = crypto.randomBytes(64).toString(`hex`); //Generating a random token
    const newUsersArr = [...users, { username, password: hashPassword }]; //Creating new users array

    // Adding to the filestorage
    fs.writeFileSync("./data/users.json", JSON.stringify(newUsersArr));
    fs.writeFileSync("./data/token.json", JSON.stringify([token]));

    // Responding with message and authorization token
    res.json({ message: "User created successfully", token: token });
  } else {
    // Responding with a message
    res.status(409).json({ message: "User already exists" });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const hashPassword = crypto
    .createHash("sha256")
    .update(`${password}.${SALT}`)
    .digest("hex");

  const token = crypto.randomBytes(64).toString("hex");

  const usersBuffer = fs.readFileSync("./data/users.json");
  const users = JSON.parse(usersBuffer);

  //   Checking if the user can log in

  if (
    users.some((user) => {
      return user.username === username && user.password === hashPassword;
    })
  ) {
    const tokenData = fs.readFileSync("./data/token.json");
    const tokens = JSON.parse(tokenData);
    fs.writeFileSync("./data/token.json", JSON.stringify([...tokens, token]));

    res.json({ message: "User logged in successfully", token: token });
  } else {
    res.json({ message: "Wrong username or password" });
  }
});

module.exports = router;
