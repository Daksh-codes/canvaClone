import Template from "../model/templateModel.js";

// Get all saved projects
export const getTemp = async (req, res) => {
  try {
    const template = await Template.find();
    return res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new saved project
export const createtTemp = async (req, res) => {
  const { userId, templateName, elements } = req.body;

  try {
    const newTemplate = new Template({
      userId,
      templateName,
      elements
    });

    const template = await newTemplate.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get saved projects of a specific userId
export const getTempuId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const template = await Template.find({ userId });
    return res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific project by projectId
export const getTemppId = async (req, res) => {
  const tempId = req.params.tempId;

  try {
    const templates = await Template.findById(tempId);
    if (!templates) {
      return res.status(404).json({ message: 'Templates  not found' });
    }
    return res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specific project by projectId
export const putTemp = async (req, res) => {
  const tempId = req.params.tempId;
  const { templateName, elements } = req.body;

  try {
    const updatedTemplate = await Template.findByIdAndUpdate(
      tempId,
      { templateName, elements },
      { new: true } 
    );

    if (!updatedTemplate) {
      return res.status(404).json({ message: 'Templates  not found' });
    }

    return res.status(200).json(updatedTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a specific project by projectId
export const deleteTemp = async (req, res) => {
  const tempId = req.params.tempId;

  try {
    const deletedTemplate = await Template.findByIdAndDelete(tempId);

    if (!deletedTemplate) {
      return res.status(404).json({ message: 'Templates not found' });
    }

    return res.status(200).json({ message: 'Templates deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

