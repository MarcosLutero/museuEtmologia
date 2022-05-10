import fs from "fs";
import path from "path";

const Routers = [];

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    Routers.push(require(path.join(__dirname, file)).default);
  });

export default Routers;
