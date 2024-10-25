const fs = require("fs");

const tokenCleanup = () => {
  fs.writeFileSync("./data/token.json", JSON.stringify([]));
};

module.exports = tokenCleanup;
