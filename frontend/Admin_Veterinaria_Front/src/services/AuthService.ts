import type {FormConfirmAccount, FormRegister} from "../types";
import {ClientAxios} from "../axios/ClientAxios.ts";
import {responseGeneralVeterinario, responseRegisterVeterinario} from "../schemas/AuthSchemas.ts";
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