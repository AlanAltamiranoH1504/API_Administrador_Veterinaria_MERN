import {z} from "zod";

export const responseRegisterVeterinario = z.object({
    status: z.boolean(),
    message: z.string()
});