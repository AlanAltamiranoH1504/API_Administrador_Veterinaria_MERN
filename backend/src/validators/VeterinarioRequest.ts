import {body, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";
import {Veterinario} from "../models/Veterinario";

const CreateVeterinarioRequest = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isString().withMessage("El nombre debe ser una cadena de texto")
        .isLength({min: 1, max: 255}).withMessage("La longitud maxima del nombre es de 255 caracteres"),
    body("apellidos")
        .notEmpty().withMessage("Los apellidos son obligatorios")
        .isString().withMessage("Los apellidos debe ser una cadena de texto")
        .isLength({min: 1, max: 255}).withMessage("La longitud maxima de los apellidos es de 255 caracteres"),
    body("email")
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Formato de email no valido")
        .isString().withMessage("Formato de email no valido"),
    body("password")
        .notEmpty().withMessage("El password es obligatorio")
        .isString().withMessage("El password no valido")
        .isLength({min: 6}).withMessage("El password debe tener al menos 6 caracteres"),
    body("edad")
        .notEmpty().withMessage("La edad es obligatorio")
        .isNumeric().withMessage("El edad debe ser un numero entero"),

    async (req: Request, res: Response, next: NextFunction) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(409).json(
                errores.array()
            );
        }

        //Validacion de email no usado
        const email_in_use = await Veterinario.findOne({email: req.body.email});
        if (email_in_use) {
            return res.status(409).json({
                status: false,
                message: "El email ya se encuentra registrado"
            });
        }
        next();
    }
];

export {
    CreateVeterinarioRequest
}