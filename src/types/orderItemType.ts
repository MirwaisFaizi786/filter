

type CartItemType = {
    productId: number;
    quantity: number;
    unitPrice: number;
    title: string;
    imageUrl: string;
    categoryName: string;
    brandName: string;
}


type CartType = {
    products: {
        productId: number;
        quantity: number;
        unitPrice: number;
        title: string;
        imageUrl: string;
        category: string;
        brand: string;
    }[]
};



export type { CartItemType, CartType }