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
    }
}, {
    timestamps: true
});
export const Veterinario = model<IVeterinario>("Veterinario", veterinarioSchema);