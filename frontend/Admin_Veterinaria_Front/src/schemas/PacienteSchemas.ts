import {z} from "zod";

export const responseGeneralPaciente = z.object({
    status: z.boolean(),
    message: z.string()
});

export const responseListPacientes = z.object({
    status: z.boolean(),
    pacientes: z.array(
        z.object({
            _id: z.string(),
            nombre: z.string(),
            propietario: z.string(),
            email_propietario: z.string(),
            telefono_propietario: z.string(),
            fecha_ingreso: z.string(),
            sintomas: z.string(),
            status: z.string(),
            veterinario: z.string(),
        })
    )
})