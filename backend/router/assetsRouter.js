import express from "express"
const router = express.Router()
import { getAssets , createAssets , deleteAssets } from "../controller/assetsController.js"

router.get("/" , getAssets )
router.post("/create" , createAssets )
router.delete("/delete/:assetId" , deleteAssets)

export default router