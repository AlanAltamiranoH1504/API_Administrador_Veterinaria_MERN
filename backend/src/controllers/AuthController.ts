import {NextFunction, Request, Response} from "express";
import {email_to_confirm_account_brevo, email_to_reset_password, generate_jwt} from "../types";
import {Veterinario} from "../models/Veterinario";
import {generate_jwt_function} from "../utils/Jwt";
import {v4 as uuidv4} from "uuid";
import {email_to_reset_password_function, sendEmail} from "../utils/Emails";
import bcrypt from "bcrypt";

export class AuthController {

    public async prueba(req: Request, res: Response, next: NextFunction) {
        const data: email_to_confirm_account_brevo = {
            token: "1504",
            email: "altamiranohernandezalan@gmail.com",
            nombre: "Alan",
            url: "Prueba"
        }
        await sendEmail(data);
        res.status(200).json({
            status: true,
            message: "Funcionando controlador auth"
        });
    }

    public async login_user(req: Request, res: Response) {
        try {
            const user = await Veterinario.findOne({email: req.body.email});
            const data_to_generate_jwt: generate_jwt = {
                nombre: user.nombre,
                email: user.email,
                _id: user._id.toString(),
            }
            const token_jwt = generate_jwt_function(data_to_generate_jwt);

            return res.status(200).json({
                status: true,
                token: token_jwt
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Error en login de usuario",
                error: e.message
            });
        }
    }

    public async send_email_to_reset_password(req: Request, res: Response) {
        try {
            const user_to_reset_password = await Veterinario.findOne({
                email: req.body.email
            });
            const token_reset = uuidv4();
            user_to_reset_password.token_reset_password = token_reset;
            const data_to_reset_password: email_to_reset_password = {
                email: req.body.email,
                nombre: user_to_reset_password.nombre,
                apellidos: user_to_reset_password.apellidos,
                token: token_reset
            }
            await email_to_reset_password_function(data_to_reset_password);
            await user_to_reset_password.save();

            return res.status(200).json({
                status: true,
                message: "Email de reset de password enviado correctamente"
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Error en envio de email para reset de password"
            });
        }
    }

    public async save_new_password(req: Request, res: Response) {
        try {
            const user_to_save_new_password = await Veterinario.findOne({
                token_reset_password: req.body.token
            });
            const new_password_hash = await bcrypt.hash(req.body.password, 10);
            user_to_save_new_password.token_reset_password = null;
            user_to_save_new_password.password = new_password_hash;
            await user_to_save_new_password.save();

            return res.status(200).json({
                status: true,
                message: "Password actualizada correctamente"
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Error en actualizacion de password de usuario",
                error: e.message
            });
        }
    }

    public async show_user_in_sesion(req, res) {
        try {
            const user_in_sesion = req.user;
            const user_to_show = await Veterinario.findOne({
                email: user_in_sesion.email
            }).select("_id nombre apellidos email telefono edad slug status");

            return res.status(200).json({
                status: true,
                user: user_to_show
            });

        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Error en indetificacion de usuario en sesion"
            });
        }
    }
}