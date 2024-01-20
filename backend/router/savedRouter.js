import express from "express"
const router = express.Router()
import { getSaved , createtSaved , getSavedpID , getSaveduId , putSaved , deleteSaved, } from "../controller/savedController.js"

router.get("/" , getSaved )
router.post("/create" , createtSaved )
router.get("/:userId" , getSavedpID )
router.get("/:projectId" , getSaveduId )
router.put("/update/:projectId" , putSaved )
router.delete("/delete/:projectId" , deleteSaved)

export default router