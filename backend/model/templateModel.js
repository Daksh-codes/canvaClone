import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  templateName: {
    type: String,
    required: true
  },

  elements: {
    type: String
  }

},{timestamps: true});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
