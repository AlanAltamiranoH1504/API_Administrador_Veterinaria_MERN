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

    public async find_all_pacientes(req: Request, res: Response) {
        try {
            const pacientes_to_show = await Paciente.find({
                // @ts-ignore
                veterinario: req.user._id,
                fecha_alta: null
            }).select("-__v");
            if (pacientes_to_show.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: "El veterinario no tiene pacientes activos actualmente"
                });
            }
            return res.status(200).json({
                status: true,
                pacientes: pacientes_to_show
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Ocurrio un error en el listado de pacientes",
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

    public async update_paciente(req: Request, res: Response) {
        try {
            const paciente_to_update = await Paciente.findById(req.params.id_paciente);
            Object.assign(paciente_to_update, req.body);
            await paciente_to_update.save();
            return res.status(200).json({
                status: true,
                message: "Paciente actualizado correctamente"
            })
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Ocurrio un error en la actualizacion del paciente",
                error: e.message
            });
        }
    }

    public async patient_discharge(req: Request, res: Response) {
        try {
            const patient_to_discharge = await Paciente.findByIdAndUpdate({
                _id: req.params.id_paciente,
            }, {
                $set: {
                    fecha_alta: new Date(),
                    sintomas: "Alta del paciente",
                    status: "Alta del paciente"
                }
            });
            return res.status(200).json({
                status: true,
                message: "Paciente dado de alta correctamente"
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Ocurrio un error en la alta del paciente"
            });
        }
    }

    public async delete_paciente(req: Request, res: Response) {
        try {
            const paciente_to_delete = await Paciente.findByIdAndDelete(req.params.id_paciente);
            return res.status(200).json({
                status: true,
                message: "Paciente eliminado correctamente"
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Ocurrio un error en la eliminacion de un paciente",
                error: e.message
            });
        }
    }
}