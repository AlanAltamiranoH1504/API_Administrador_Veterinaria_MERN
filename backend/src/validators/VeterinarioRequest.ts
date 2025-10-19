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
    body("telefono")
        .isString().withMessage("El numero de telefono debe ser una cadena de numeros")
        .isLength({min: 10}).withMessage("El numero debe tener al menos 10 caracteres (55 1234 5678)"),
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

const ConfirmVeterinarioRquest = [
    body("token_confirmacion")
        .notEmpty().withMessage("El token de confirmacion es obligatorio")
        .isString().withMessage("El token de confirmacion debe ser una cadena de caracteres"),
    body("email_veterinario")
        .notEmpty().withMessage("El email del veterinario es obligatorio")
        .isEmail().withMessage("El formato del email no es valido"),
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json(errors.array());
        }

        // * Busqueda de veterinario pendiente de confirmacion
        const veterinario_to_confirm = await Veterinario.findOne({
            email: req.body.email_veterinario,
            token_confirmacion: req.body.token_confirmacion,
            confirmado: false
        });

        if (!veterinario_to_confirm) {
            return res.status(404).json({
                status: false,
                message: "No existe ningun veterinario por confirmar con los datos enviados"
            });
        }

        veterinario_to_confirm.token_confirmacion = null;
        veterinario_to_confirm.confirmado = true;
        await veterinario_to_confirm.save();
        next();
    }
];

export {
    CreateVeterinarioRequest,
    ConfirmVeterinarioRquest
}