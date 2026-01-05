import type {FormRegister} from "../types";
import {ClientAxios} from "../axios/ClientAxios.ts";
import {responseRegisterVeterinario} from "../schemas/AuthSchemas.ts";

export async function registerVeterinarioFunction(data: FormRegister) {
    try {
         const responseAPI = await ClientAxios.post("/veterinarios/save_veterinario", data);
        const resultAPI = responseRegisterVeterinario.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return true;
        }
    }catch (e) {
        // @ts-ignore
        throw new Error(`Ocurrio un error en el registro de usuario: ${e.message}`);
    }
}