import express from "express";
const router = express.Router();
import Auth from "../middleware/authMiddleware.js";
import {
  getSaved,
  createtSaved,
  getSavedpID,
  getSaveduId,
  putSaved,
  deleteSaved,
} from "../controller/savedController.js";

router.get("/", getSaved);
router.post("/create", Auth, createtSaved);
router.get("/:userId", Auth, getSaveduId);
router.get("/getProject/:projectId", Auth, getSavedpID);
router.put("/update/:projectId", Auth, putSaved);
router.delete("/delete/:projectId", Auth, deleteSaved);

export default router;
