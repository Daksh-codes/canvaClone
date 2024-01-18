import mongoose from "mongoose";

const assetsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  svg: { type: String, required: true },
  type: { type: String, required: true, default: "svg" },
});

const Assets = mongoose.model("Assets", assetsSchema);
export default Assets;
