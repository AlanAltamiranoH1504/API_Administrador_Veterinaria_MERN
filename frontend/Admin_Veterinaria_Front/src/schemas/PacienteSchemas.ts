import {z} from "zod";

export const responseGeneralPaciente = z.object({
    status: z.boolean(),
    message: z.string()
});