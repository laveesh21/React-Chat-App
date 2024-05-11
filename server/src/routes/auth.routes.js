import express from "express";
import {login, signup} from '../controllers/auth.controller.js'

const router = express.Router();

router.post("/login", login)
router.post("/signup", signup);

router.get("/profile", (req, res) => {
    const user = JSON.parse(req.cookies.user);
    res.json(user);
});


export default router;
