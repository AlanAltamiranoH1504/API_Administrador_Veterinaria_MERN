import {Request, Response} from "express";
import {Veterinario} from "../models/Veterinario";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import * as crypto from "node:crypto";
import {email_confirm_user} from "../types";
import {email_confirm_user_function} from "../utils/Emails";

export class VeterinarioController {
    public prueba(req: Request, res: Response) {
        return res.status(200).json({
            status: true,
            message: "Funcionando controlador de veterinarios"
        });
    }

    public async save_veterinario(req: Request, res: Response) {
        try {
            const {nombre, apellidos, email, password, edad} = req.body;
            const password_hash = await bcrypt.hash(password, 10);
            const token_confirm_user = uuidv4();
            const six_digit_token = crypto.randomBytes(3).toString("hex");
            const veterinario_to_save = await Veterinario.create({
                nombre,
                apellidos,
                email,
                password: password_hash,
                edad,
                telefono: req.body.telefono ? req.body.telefono : null,
                slug: uuidv4(),
                token_confirmacion: token_confirm_user,
                six_digit_token: six_digit_token
            });
            const data: email_confirm_user = {
                nombre,
                apellidos,
                email,
                token: token_confirm_user,
                six_digit_token: six_digit_token
            }
            await email_confirm_user_function(data);

            return res.status(201).json({
                status: true,
                message: "Veterinario agregado correctamente. Confirma tu cuenta."
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Error en creacion de veterinario",
                error: e.message
            });
        }
    }

    public async confirm_veterinario(req: Request, res: Response) {
        try {
            return res.status(200).json({
                status: true,
                message: "Tu perfil ha sido confirmador correctamente ✅"
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Error en confirmacion de veterinario",
                error: e.message
            });
        }
    }

    public async update_veterinario(req, res) {
        try {
            const id_user_in_session = req.user._id;
            const user_to_update = await Veterinario.findByIdAndUpdate(id_user_in_session, {
                $set: {
                    nombre: req.body.nombre,
                    apellidos: req.body.apellidos,
                    email: req.body.email,
                    telefono: req.body.telefono,
                    edad: req.body.edad,
                }
            });
            return res.status(200).json({
                status: true,
                message: "Veterinario actualizado correctamente",
            })
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Error en actualizacion de veterinario",
                error: e.message
            });
        }
    }
}