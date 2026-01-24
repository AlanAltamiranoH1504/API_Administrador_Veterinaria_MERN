import type {FormEditProfile} from "../types";
import axios from "axios";
import {ClientAxios} from "../axios/ClientAxios.ts";
import {responseGeneralVeterinario} from "../schemas/AuthSchemas.ts";

export async function updateVeterinarioPUT(data: FormEditProfile) {
    try {
        const responseAPI = await ClientAxios.put("/veterinarios/update_veterinario", data, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt_veterinaria"),
            }
        });
        const resultAPI = responseGeneralVeterinario.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return responseAPI.data;
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw e.response?.data || {
                message: "Error en actualizacion de datos"
            }
        }
        throw e;
    }
}