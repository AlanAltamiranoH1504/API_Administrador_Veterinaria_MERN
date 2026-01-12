import express from "express";
import {AuthController} from "../controllers/AuthController";
import {LoginRequest, SaveNewPasswordRequest, SendEmailToResetPassRequest} from "../validators/AuthRequest";
import {jwt_middleware} from "../middlewares/jwt_middleware";

const router = express.Router();

const authController = new AuthController();

router.get("/prueba", authController.prueba);
router.post("/login_user", LoginRequest, authController.login_user);
router.post("/send_email_to_reset_password", SendEmailToResetPassRequest, authController.send_email_to_reset_password);
router.post("/save_new_password", SaveNewPasswordRequest, authController.save_new_password);
router.get("/show_user_in_sesion", jwt_middleware, authController.show_user_in_sesion);

export default router;