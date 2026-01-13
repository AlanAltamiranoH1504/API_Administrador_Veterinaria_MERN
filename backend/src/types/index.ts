import {Document} from 'mongoose';
import * as mongoose from "mongoose";
export interface IVeterinario extends Document {
    nombre: string,
    apellidos: string,
    email: string,
    telefono: string,
    password: string,
    edad: number,
    slug: string,
    status: boolean,
    token_confirmacion: string,
    six_digit_token: string,
    token_reset_password: string,
    confirmado: boolean,
}

export interface IPaciente extends Document {
    nombre: string;
    propietario: string;
    email_propietario: string;
    telefono_propietario: string;
    fecha_ingreso: Date,
    fecha_alta: Date,
    sintomas: string,
    status: string;
    veterinario: mongoose.Schema.Types.ObjectId
}

export type email_confirm_user = {
    nombre: string,
    apellidos: string,
    email: string,
    token: string
    six_digit_token: string
}

export type email_to_reset_password = {
    nombre: string,
    apellidos: string,
    email: string,
    token: string,
    six_digit_token: string
}

export type generate_jwt = {
    nombre: string,
    email: string,
    _id: string,
}

// * Types para emails de brevo
export type email_to_confirm_account_brevo = {
    nombre: string,
    email: string,
    token: string,
    url: string
}