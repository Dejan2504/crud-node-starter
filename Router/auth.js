const router = require("express").Router();
const crypto = require("crypto");

router.get("/", (req, res) => {
  const token = crypto.randomBytes(32).toString("hex");

  res.json({ token: token });
});

module.exports = router;
