// * Types para Formularios
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