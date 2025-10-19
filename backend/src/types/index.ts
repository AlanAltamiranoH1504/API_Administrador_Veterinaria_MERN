import {Document} from 'mongoose';
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
    token_reset_password: string,
    confirmado: boolean,
}

export type email_confirm_user = {
    nombre: string,
    apellidos: string,
    email: string,
    token: string
}