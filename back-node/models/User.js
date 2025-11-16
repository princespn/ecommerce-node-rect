import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  password: String,
  address: String,
});

const User = mongoose.model("User", userSchema);

export default User;
