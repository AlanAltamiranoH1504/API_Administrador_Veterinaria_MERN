import {Request, Response} from "express";
import {generate_jwt} from "../types";
import {Veterinario} from "../models/Veterinario";
import {generate_jwt_function} from "../utils/Jwt";

export class AuthController {

    public prueba(req: Request, res: Response) {
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
}