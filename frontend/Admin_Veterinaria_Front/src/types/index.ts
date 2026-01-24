// * Types para Formularios
import {z} from "zod";
import {responseFindPaciente, type responseListPacientes} from "../schemas/PacienteSchemas.ts";
import type {responseUserInSessionSchema} from "../schemas/AuthSchemas.ts";

export type FormRegister = {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    edad: string;
    password: string;
}

export type FormConfirmAccount = {
    token_confirmacion: string,
    six_digit_token: string
}

export type FormLoginAccount = {
    email: string,
    password: string
}

export type FormForgetPassword = {
    email: string;
}
export type FormConfirmPassword = {
    six_digit_token: string,
    password: string,
    password_confirmation: string,
    token: string
}

export type FormSavePaciente = {
    nombre: string,
    propietario: string,
    email_propietario: string,
    telefono_propietario: string,
    sintomas: string,
    status: string
}

export type FormEditProfile = {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    edad: string;
}

export type FormEditPaciente = {
    _id: string,
    nombre: string,
    propietario: string,
    email_propietario: string,
    telefono_propietario: string,
    sintomas: string,
    status: string
}

export type ListPacientes = z.infer<typeof responseListPacientes>;
export type FindPaciente = z.infer<typeof responseFindPaciente>;
export type UserInSession = z.infer<typeof responseUserInSessionSchema>