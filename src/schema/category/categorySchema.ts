import { z } from "zod";


export const categorySchema = z.object({
        categoryId: z.number(),
        name: z.string(),
    });

export type CategoryType = z.infer<typeof categorySchema>;