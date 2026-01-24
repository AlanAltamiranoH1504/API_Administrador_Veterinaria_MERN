import type {FormEditPaciente, FormSavePaciente} from "../types";
import axios from "axios";
import {ClientAxios} from "../axios/ClientAxios.ts";
import {responseFindPaciente, responseGeneralPaciente, responseListPacientes} from "../schemas/PacienteSchemas.ts";

export async function savePacientePOST(data: FormSavePaciente) {
    try {
        const responseAPI = await ClientAxios.post("/pacientes/save_paciente", data, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt_veterinaria")
            }
        });
        const resultAPI = responseGeneralPaciente.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return responseAPI.data;
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw e.response?.data || {
                message: "Ocurrio un error en el registro del paciente"
            }
        }
        throw e;
    }
}

export async function listPacientesGET() {
    try {
        const responseAPI = await ClientAxios.get("/pacientes/find_all_pacientes", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt_veterinaria")
            }
        });
        const resultAPI = responseListPacientes.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return responseAPI.data;
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw e.response?.data || {
                message: "Ocurrio un error en el listado de pacientes"
            }
        }
        throw e;
    }
}

export async function deletePacienteDELETE(id: string) {
    try {
        const responseAPI = await ClientAxios.delete(`/pacientes/delete_paciente/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt_veterinaria")
            }
        });
        const resultAPI = responseGeneralPaciente.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return responseAPI.data;
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw e.response?.data || {
                message: "Ocurrio un error en la eliminación"
            }
        }
        throw e;
    }
}

export async function findPacienteByIdGET(id: string) {
    try {
        const responseAPI = await ClientAxios.get(`/pacientes/find_paciente/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt_veterinaria")
            }
        });
        const resultAPI = responseFindPaciente.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return responseAPI.data;
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw e.response?.data || {
                message: "Ocurrio un error en la busqueda del paciente"
            }
        }
        throw e;
    }
}

export async function updatePacientePUT(data: FormEditPaciente) {
    try {
        const responseAPI = await ClientAxios.put(`/pacientes/update_paciente/${data._id}`, data, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt_veterinaria")
            }
        });
        const resultAPI = responseGeneralPaciente.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return responseAPI.data;
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw e.response?.data || {
                message: "Ocurrio un error en la actualizacion del paciente"
            }
        }
        throw e;
    }
}