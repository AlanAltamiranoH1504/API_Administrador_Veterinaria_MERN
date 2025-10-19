import express from "express";
import {AuthController} from "../controllers/AuthController";
import {LoginRequest} from "../validators/AuthRequest";
import {jwt_middleware} from "../middlewares/jwt_middleware";

const router = express.Router();

const authController = new AuthController();

router.get("/prueba", jwt_middleware, authController.prueba);
router.post("/login_user", LoginRequest, authController.login_user);

export default router;