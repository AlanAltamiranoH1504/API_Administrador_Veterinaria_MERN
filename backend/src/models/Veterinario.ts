import * as mongoose from "mongoose";
import {IVeterinario} from "../types";

const {Schema, model} = mongoose;

const veterinarioSchema = new Schema<IVeterinario>({
    nombre: {
        type: String,
        required: true,
        trim: true,
        nullable: false
    },
    apellidos: {
        type: String,
        required: true,
        trim: true,
        nullable: false
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    telefono: {
        type: String,
        required: false,
        trim: true,
        nullable: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        nullable: false
    },
    edad: {
        type: Number,
        required: true,
        nullable: false
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        nullable: false
    },
    status: {
        type: Boolean,
        default: true
    },
    token_confirmacion: {
        type: String,
        nullable: true
    },
    token_reset_password: {
        type: String,
        nullable: true
    },
    confirmado: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
export const Veterinario = model<IVeterinario>("Veterinario", veterinarioSchema);