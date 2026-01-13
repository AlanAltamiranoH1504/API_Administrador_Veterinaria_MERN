import type {
    FormConfirmAccount,
    FormConfirmPassword,
    FormForgetPassword,
    FormLoginAccount,
    FormRegister
} from "../types";
import {ClientAxios} from "../axios/ClientAxios.ts";
import {responseGeneralVeterinario, responseLoginSchema, responseRegisterVeterinario} from "../schemas/AuthSchemas.ts";
import axios from "axios";

export async function registerVeterinarioFunction(data: FormRegister) {
    try {
         const responseAPI = await ClientAxios.post("/veterinarios/save_veterinario", data);
        const resultAPI = responseRegisterVeterinario.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return true;
        }
    }catch (e) {
        if (axios.isAxiosError(e)) {
            throw e.response?.data || {
                message: "Error en registro de cuenta"
            }
        }
    }
}

export async  function  confirmVeterinarioFunction(data: FormConfirmAccount) {
    try {
        const responseAPI = await ClientAxios.post("/veterinarios/confirm_veterinario", data);
        const resultAPI = responseGeneralVeterinario.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return responseAPI.data;
        }
    }catch (e) {
        if (axios.isAxiosError(e)) {
            throw e.response?.data || {
                message: "Error en confirmación de cuenta"
            }
        }
        throw e;
    }
}

export async function loginFunction(data: FormLoginAccount) {
    try {
        const responseAPI = await ClientAxios.post("/auth/login_user", data);
        const resultAPI = responseLoginSchema.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return responseAPI.data;
        }
    }catch (e) {
        if (axios.isAxiosError(e)) {
            throw e.response?.data ||  {
                message: "Ocurrio un error en el inicio de sesion"
            }
        }
        throw e;
    }
}

export async function forgePasswordFunction(data: FormForgetPassword) {
    try {
        const responseAPI = await ClientAxios.post("/auth/send_email_to_reset_password", data);
        const resultAPI = responseGeneralVeterinario.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return responseAPI.data;
        }
    }catch (e) {
        if (axios.isAxiosError(e)) {
            throw e.response?.data || {
                message: "Ocurrio un error en la recuperación de contraseña"
            }
        }
        throw e;
    }
}

export async function saveNewPasswordFunction(data: FormConfirmPassword) {
    try {
        const responseAPI = await ClientAxios.post("/auth/save_new_password", data);
        const resultAPI = responseGeneralVeterinario.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return responseAPI.data;
        }
    }catch (e) {
        if (axios.isAxiosError(e)) {
            throw  e.response?.data || {
                message: "Ocurrio un error en la actualizacion de password"
            }
        }
        throw e;
    }
}