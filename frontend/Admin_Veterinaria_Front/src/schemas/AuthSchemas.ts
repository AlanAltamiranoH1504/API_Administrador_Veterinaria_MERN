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