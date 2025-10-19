import express from "express";
import {AuthController} from "../controllers/AuthController";
import {LoginRequest} from "../validators/AuthRequest";

const router = express.Router();

const authController = new AuthController();

router.get("/prueba", authController.prueba);
router.post("/login_user", LoginRequest, authController.login_user);

export default router;