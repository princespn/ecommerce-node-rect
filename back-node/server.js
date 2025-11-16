import mongoose from "mongoose";
import fs from "fs";
import path from "path";

mongoose.connect("mongodb://localhost:27017/discountdady");

// Auto-load all schema files
const modelsPath = path.resolve("models");
fs.readdirSync(modelsPath).forEach((file) => {
  if (file.endsWith(".js")) {
    import(path.join(modelsPath, file));
  }
});
