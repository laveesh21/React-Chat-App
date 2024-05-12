import { getMessage, addMessage } from "../controllers/message.controller.js";
import express from "express";
const router = express.Router();

router.post("/addmsg", addMessage)
router.post("/getmsg", getMessage)

export default router;