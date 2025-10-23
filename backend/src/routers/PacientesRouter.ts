import express from "express";
import {PacienteController} from "../controllers/PacienteController";
import {CreatePacienteRequest, FindPacienteRequest} from "../validators/PacienteRequest";
import {jwt_middleware} from "../middlewares/jwt_middleware";

const router = express.Router();
const pacienteController = new PacienteController();

router.get("/prueba", pacienteController.prueba);
router.post("/save_paciente", jwt_middleware, CreatePacienteRequest, pacienteController.save_paciente);
router.get("/find_paciente/:id_paciente", jwt_middleware, FindPacienteRequest, pacienteController.find_paciente);

export default router;