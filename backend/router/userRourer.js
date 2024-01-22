import express from "express";
import { registerUser , loginUser  } from "../controller/userController.js";
import Auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser );
router.post("/login", loginUser );

export default router