import mongoose from "mongoose";

const savedProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    projectName: {
      type: String,
      required: true,
    },

    elements: {
      type: String,
    },

    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
  },
  { timestamps: true }
);

const SavedProject = mongoose.model("SavedProject", savedProjectSchema);
export default SavedProject;
