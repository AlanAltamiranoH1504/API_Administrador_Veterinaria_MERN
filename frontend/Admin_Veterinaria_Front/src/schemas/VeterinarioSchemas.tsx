import {z} from 'zod';

export const responseGeneralVeterinario = z.object({
    status: z.boolean(),
    message: z.string()
});