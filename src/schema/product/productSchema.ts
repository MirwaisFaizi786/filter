

import { z } from "zod";

// products {
//     totalPages: 0,
//     totalCount: 9,
//     pageIndex: 0,
//     pageSize: 0,
//     productList: [
//       {
//         productId: 1,
//         sku: 'Adidas T-shirt',
//         title: "Adidas Men's T-shirt",
//         description: 'Adidas T-shirt',
//         unitPrice: 500,
//         imageUrl: 'green_1.png',
//         unitsInStock: 100,
//         active: true,
//         category: [Object],
//         brand: [Object]
//       },
//       {
//         productId: 2,
//         sku: 'Nike T-shirt',
//         title: 'Nike Dri-FIT T-shirt',
//         description: 'Nike Dri-FIT T-shirt',
//         unitPrice: 450,
//         imageUrl: 'green_2.png',
//         unitsInStock: 150,
//         active: true,
//         category: [Object],
//         brand: [Object]
//       },
//       {
//         productId: 3,
//         sku: 'Puma T-shirt',
//         title: 'Puma Essentials T-shirt',
//         description: 'Puma Essentials T-shirt',
//         unitPrice: 140,
//         imageUrl: 'green_3.png',
//         unitsInStock: 120,
//         active: true,
//         category: [Object],
//         brand: [Object]
//       },
//       {
//         productId: 4,
//         sku: 'Nike Shoes',
//         title: 'Nike Air Force 1',
//         description: 'Nike Air Force 1 Sneakers',
//         unitPrice: 100,
//         imageUrl: 'nike_2.png',
//         unitsInStock: 100,
//         active: true,
//         category: [Object],
//         brand: [Object]
//       },
//       {
//         productId: 5,
//         sku: 'Nike Shoes',
//         title: 'Nike Air Max',
//         description: 'Nike Air Max Sneakers',
//         unitPrice: 120,
//         imageUrl: 'nike_1.png',
//         unitsInStock: 150,
//         active: true,
//         category: [Object],
//         brand: [Object]
//       },
//       {
//         productId: 6,
//         sku: 'Adidas Jacket',
//         title: "Adidas Men's Jacket",
//         description: "Adidas Men's Jacket",
//         unitPrice: 200,
//         imageUrl: 'jacket_1.png',
//         unitsInStock: 100,
//         active: true,
//         category: [Object],
//         brand: [Object]
//       },
//       {
//         productId: 7,
//         sku: 'Adidas Pants',
//         title: "Adidas Men's Pants",
//         description: "Adidas Men's Pants",
//         unitPrice: 20,
//         imageUrl: 'pants_1.png',
//         unitsInStock: 100,
//         active: true,
//         category: [Object],
//         brand: [Object]
//       },
//       {
//         productId: 8,
//         sku: 'Puma Pants',
//         title: "Puma Men's Pants",
//         description: "Puma Men's Pants",
//         unitPrice: 45,
//         imageUrl: 'pants_2.png',
//         unitsInStock: 150,
//         active: true,
//         category: [Object],
//         brand: [Object]
//       },
//       {
//         productId: 9,
//         sku: 'Adidas Pants',
//         title: "Adidas Men's Pants",
//         description: "Adidas Men's Pants",
//         unitPrice: 30,
//         imageUrl: 'pants_3.png',
//         unitsInStock: 120,
//         active: true,
//         category: [Object],
//         brand: [Object]
//       }
//     ]
//   }


export const productSchema = z.object({
    
    productId: z.number(),
    sku: z.string(),
    title: z.string(),
    description: z.string(),
    unitPrice: z.number(),
    imageUrl: z.string(),
    unitsInStock: z.number(),
    active: z.boolean(),
    category: z.object({
        id: z.number(),
        name: z.string(),
    }),
    brand: z.object({
        id: z.number(),
        name: z.string(),
    }),
});

export const productFilterSchema = z.object({
    totalPages: z.number(),
    totalCount: z.number(),
    pageSize: z.number(),
    pageIndex: z.number(),
    productList: z.array(productSchema),
});

export type ProductFilterType = z.infer<typeof productFilterSchema>;

export type ProductType = z.infer<typeof productSchema>;