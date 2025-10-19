import {Request, Response, NextFunction} from "express";
import {body, validationResult} from "express-validator";
import {Veterinario} from "../models/Veterinario";
import bcrypt from "bcrypt";

const LoginRequest = [
    body("email")
        .notEmpty().withMessage("El email de usuario es obligatorio")
        .isEmail().withMessage("El formato del email no es valido"),
    body("password")
        .notEmpty().withMessage("El password es obligatorio")
        .isString().withMessage("El password debe ser una cadena de caracteres"),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json(errors.array());
        }

        // * Busqueda de usuario con datos y confirmado
        const user_to_login = await Veterinario.findOne({
            email: req.body.email
        });

        if (!user_to_login) {
            return res.status(404).json({
                status: false,
                message: `No se encuentra ningun usuario registrado con el email: ${req.body.email}`,
            });
        }

        if (!user_to_login.confirmado) {
            return res.status(409).json({
                status: false,
                message: "El usuario aun no ha confirmado se cuenta. Por favor revisa tus correos en tu email"
            });
        }

        // * Check de password
        const check_password = await bcrypt.compare(req.body.password, user_to_login.password);
        if (!check_password) {
            return res.status(403).json({
                status: false,
                message: "Las credenciales son incorrectas"
            });
        }
        next();
    }
];

export {
    LoginRequest
}