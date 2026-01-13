import {z} from "zod";

export const responseRegisterVeterinario = z.object({
    status: z.boolean(),
    message: z.string()
});
export const responseGeneralVeterinario = z.object({
    status: z.boolean(),
    message: z.string()
});
export const responseLoginSchema = z.object({
    status: z.boolean(),
    token: z.string()
});
export const responseUserInSessionSchema = z.object({
    status: z.boolean(),
    user: z.object({
        _id: z.string(),
        nombre: z.string(),
        apellidos: z.string(),
        email: z.string(),
        telefono: z.string(),
        edad: z.number(),
        slug: z.string(),
        status: z.boolean()
    })
})