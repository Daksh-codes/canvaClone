import express from "express"
const router = express.Router()
import { getTemp , createtTemp, getTempuId , getTemppId , putTemp , deleteTemp, } from "../controller/templateController.js"

router.get("/" , getTemp )
router.post("/create" , createtTemp )
router.get("/:userId" , getTempuId )
router.get("/:tempId" , getTemppId )
router.put("/update/:tempId" , putTemp )
router.delete("/delete/:tempId" , deleteTemp)

export default router