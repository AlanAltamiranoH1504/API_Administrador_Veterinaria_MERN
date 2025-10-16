import {Request, Response} from "express";

export class PacienteController {
    public prueba(req: Request, res: Response) {
        return res.json({
            status: true,
            message: "Funcionando metodo de prueba de PacienteController"
        });
    }
}