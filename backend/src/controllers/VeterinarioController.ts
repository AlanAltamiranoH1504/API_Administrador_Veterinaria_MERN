import {Request, Response} from "express";
import {Veterinario} from "../models/Veterinario";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";

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
            const veterinario_to_save = await Veterinario.create({
                nombre,
                apellidos,
                email,
                password: password_hash,
                edad,
                slug: uuidv4()
            });
            return res.status(201).json({
                status: true,
                message: "Veterinario agregado correctamente"
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Error en creacion de veterinario",
                error: e.message
            });
        }
    }
}