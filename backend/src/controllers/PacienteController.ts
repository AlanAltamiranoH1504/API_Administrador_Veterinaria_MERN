import {Request, Response} from "express";
import {Paciente} from "../models/Paciente";

export class PacienteController {
    public prueba(req: Request, res: Response) {
        return res.json({
            status: true,
            message: "Funcionando metodo de prueba de PacienteController"
        });
    }

    public async save_paciente(req: Request, res: Response) {
        try {
            const {nombre, propietario, email_propietario, telefono_propietario, sintomas, status} = req.body;

            const paciente_to_save = await Paciente.create({
                nombre,
                propietario,
                email_propietario,
                telefono_propietario,
                sintomas,
                status,
                // @ts-ignore
                veterinario: req.user._id
            })
            return res.status(201).json({
                status: true,
                message: "Paciente agregado correctamente"
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Ocurrio un error en el registro de un nuevo paciente",
                error: e.message
            });
        }
    }

    public async find_paciente(req: Request, res: Response) {
        try {
            const paciente_to_show = await Paciente.findOne({
                _id: req.params.id_paciente,
                // @ts-ignore
                veterinario: req.user._id
            }).populate({
                path: "veterinario",
                select: "nombre apellidos email"
            })
                .select("-__v");
            return res.status(200).json({
                status: true,
                paciente: paciente_to_show
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Ocurrio un error en la busqueda del paciente",
                error: e.message
            });
        }
    }
}