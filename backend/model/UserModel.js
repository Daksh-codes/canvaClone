import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Fname: {
    type: String,
    required: true,
  },

  Lname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
S;
module.exports = User;
