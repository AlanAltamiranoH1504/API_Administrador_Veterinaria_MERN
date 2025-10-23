import * as mongoose from "mongoose";
import {IPaciente} from "../types";

const {Schema, model} = mongoose;

const pacienteSchemea = new Schema<IPaciente>({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    propietario: {
        type: String,
        required: true,
        trim: true
    },
    email_propietario: {
        type: String,
        required: true,
        trim: true
    },
    telefono_propietario: {
        type: String,
        required: true,
        trim: true
    },
    fecha_ingreso: {
        type: Date,
        default: new Date()
    },
    fecha_alta: {
        type: Date,
        required: false
    },
    sintomas: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    veterinario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Veterinario",
        required: true
    }
});
export const Paciente = model<IPaciente>("Paciente", pacienteSchemea);