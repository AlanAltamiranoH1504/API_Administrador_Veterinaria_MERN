import express from "express";
import {VeterinarioController} from "../controllers/VeterinarioController";
import {ConfirmVeterinarioRquest, CreateVeterinarioRequest} from "../validators/VeterinarioRequest";

const router = express.Router();
const veterinarioController = new VeterinarioController();

router.post("/save_veterinario", CreateVeterinarioRequest, veterinarioController.save_veterinario);
router.post("/confirm_veterinario", ConfirmVeterinarioRquest, veterinarioController.confirm_veterinario);

export default router;