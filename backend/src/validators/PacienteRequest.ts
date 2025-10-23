import {Request, Response, NextFunction} from "express";
import {body, param, validationResult} from "express-validator";
import {Paciente} from "../models/Paciente";

const CreatePacienteRequest = [
    body("nombre")
        .notEmpty().withMessage("El nombre del paciente es obligatorio")
        .isString().withMessage("El nombre del paciente debe ser una cadena de texto"),
    body("propietario")
        .notEmpty().withMessage("El nombre del propiertario es obligatorio")
        .isString().withMessage("El nombre del propitario debe ser una cadena de texto"),
    body("email_propietario")
        .notEmpty().withMessage("El email del propietario es obligatorio")
        .isEmail().withMessage("Formato de email no valido"),
    body("telefono_propietario")
        .notEmpty().withMessage("El telefono del propietario de es obligatorio")
        .isNumeric().withMessage("El formato del telefono no es valido"),
    body("sintomas")
        .notEmpty().withMessage("Los sintomas iniciales son obligatorios")
        .isString().withMessage("Los sintomas debe ser una cadena de texto"),
    body("status")
        .notEmpty().withMessage("El status es obligatorio")
        .isString().withMessage("El status debe ser una cadena de texto"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json(errors.array());
        }
        next();
    }
];

const FindPacienteRequest = [
    param("id_paciente")
        .notEmpty().withMessage("El id del paciente a buscar es obligatorio")
        .isString().withMessage("Id de paciente a buscar no valido"),
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json(errors.array());
        }

        // * Busqueda de paciente
        const paciente_to_show = await Paciente.findById(req.params.id_paciente);
        if (!paciente_to_show) {
            return res.status(404).json({
                status: false,
                message: `No existe un paciente con el id ${req.params.id_paciente}`,
            });
        }

        // * Validacion de que el paciente es de usuario en sesion
        // @ts-ignore
        if (paciente_to_show.veterinario.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                status: false,
                message: "Area no autorizada"
            });
        }
        next();
    }
]

export {
    CreatePacienteRequest,
    FindPacienteRequest
}