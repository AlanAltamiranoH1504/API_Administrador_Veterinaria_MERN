import {Document} from 'mongoose';
export interface IVeterinario extends Document {
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    edad: number,
    slug: string,
    status: boolean
}