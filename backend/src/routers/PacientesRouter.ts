import express from "express";
import {PacienteController} from "../controllers/PacienteController";
import {CreatePacienteRequest, FindPacienteRequest, UpdatePacienteRequest} from "../validators/PacienteRequest";
import {jwt_middleware} from "../middlewares/jwt_middleware";

const router = express.Router();
const pacienteController = new PacienteController();

router.get("/prueba", pacienteController.prueba);
router.post("/save_paciente", jwt_middleware, CreatePacienteRequest, pacienteController.save_paciente);
router.get("/find_paciente/:id_paciente", jwt_middleware, FindPacienteRequest, pacienteController.find_paciente);
router.get("/find_all_pacientes", jwt_middleware, pacienteController.find_all_pacientes);
router.put("/update_paciente/:id_paciente", jwt_middleware, FindPacienteRequest, UpdatePacienteRequest, pacienteController.update_paciente);
router.patch("/patient_discharge/:id_paciente", jwt_middleware, FindPacienteRequest, pacienteController.patient_discharge);
router.delete("/delete_paciente/:id_paciente", jwt_middleware, FindPacienteRequest, pacienteController.delete_paciente);

export default router;