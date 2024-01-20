import mongoose from "mongoose";

const savedProjectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  projectName: {
    type: String,
    required: true
  },

  elements: {
    type: String
  }

},{timestamps: true});

const SavedProject = mongoose.model('SavedProject', savedProjectSchema);
export default SavedProject;