import { z } from "zod";


export const brandSchema = z.object({
        brandId: z.number(),
        name: z.string(),
    });

export type BrandType = z.infer<typeof brandSchema>;