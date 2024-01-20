import SavedProject from "../model/savedProjectModel.js";

// Get all saved projects
export const getSaved = async (req, res) => {
  try {
    const projects = await SavedProject.find();
    return res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new saved project
export const createtSaved = async (req, res) => {
  const { userId, projectName, elements } = req.body;

  try {
    const newProject = new SavedProject({
      userId,
      projectName,
      elements
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get saved projects of a specific userId
export const getSaveduId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const projects = await SavedProject.find({ userId });
    return res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific project by projectId
export const getSavedpID = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const project = await SavedProject.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specific project by projectId
export const putSaved = async (req, res) => {
  const projectId = req.params.projectId;
  const { projectName, elements } = req.body;

  try {
    const updatedProject = await SavedProject.findByIdAndUpdate(
      projectId,
      { projectName, elements },
      { new: true } 
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a specific project by projectId
export const deleteSaved = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const deletedProject = await SavedProject.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

