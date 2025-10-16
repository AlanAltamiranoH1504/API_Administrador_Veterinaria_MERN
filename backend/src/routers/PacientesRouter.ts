import express from "express";
import {PacienteController} from "../controllers/PacienteController";

const router = express.Router();
const pacienteController = new PacienteController();

router.get("/prueba", pacienteController.prueba);

export default router;