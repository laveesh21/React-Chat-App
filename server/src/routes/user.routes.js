import express from "express";
import { users } from "../controllers/users.controller.js";
const router = express.Router();

router.get("/:id", users)


export default router;