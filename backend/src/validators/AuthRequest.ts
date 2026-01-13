import {Request, Response, NextFunction} from "express";
import {body, check, validationResult} from "express-validator";
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

const SendEmailToResetPassRequest = [
    body("email")
        .notEmpty().withMessage("El email de usuario es obligatorio")
        .isEmail().withMessage("El formato del email no es valido"),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        // * Busqueda de usuario
        const user_to_reset = await Veterinario.findOne({
            email: req.body.email
        });

        if (!user_to_reset) {
            return res.status(404).json({
                status: false,
                message: `No se encuentra ningun usuario registrado con el email ${req.body.email}`,
            });
        }

        if (!user_to_reset.confirmado) {
            return res.status(403).json({
                status: false,
                message: "El usuario aun no ha confirmado su cuenta, por lo cual no puede hacer cambio de su password"
            });
        }
        next();
    }
];

const SaveNewPasswordRequest = [
    body("password")
        .notEmpty().withMessage("El password nuevo es obligatorio")
        .isString().withMessage("El password nuevo debe ser una cadena de caracteres")
        .isLength({min: 6}).withMessage("El password debe tener al menos 6 caracteres"),
    check("password")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/)
        .withMessage("El password debe tener al menos una mayúscula, una minúscula, un número y un carácter especial"),
    body("token")
        .notEmpty().withMessage("El token de reset es obligatorio")
        .isString().withMessage("El token de reset no es valido"),
    body("six_digit_token")
        .notEmpty().withMessage("El codigo de seis digitos es obligatorio")
        .isString().withMessage("Token de seis digitos no valido")
        .isLength({min: 6, max: 6}).withMessage("Longitud de otken no valida"),

    async (req: Request, res: Response, next: NextFunction) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(409).json(error.array());
        }

        // * Busqueda de usuario para hacer reset
        const user_to_reset = await Veterinario.findOne({
            token_reset_password: req.body.token,
            six_digit_token: req.body.six_digit_token,
            confirmado: true
        });
        if (!user_to_reset) {
            return res.status(404).json({
                status: false,
                message: "No se encuentra ningun usuario con los datos ingresados para reset de password"
            });
        }
        next();
    }
]

export {
    LoginRequest,
    SendEmailToResetPassRequest,
    SaveNewPasswordRequest
}