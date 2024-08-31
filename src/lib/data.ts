import { CartItemType, CartType } from "@/types/orderItemType";

const cartData: CartItemType[] = [
    {
        productId: 1,
        quantity: 1,
        unitPrice: 100,
        title: "Product 1",
        imageUrl: "beige_1.png",
        categoryName: "Category 1",
        brandName: "Brand 1",
    }
]

export default cartData



const getAllCartData = async (): Promise<CartItemType[]> => {
    return cartData
};


const addToCart = async (product: CartItemType): Promise<CartItemType> => {
    const existingProduct = cartData.find((item) => item.productId === product.productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
        return existingProduct
    } else {
        cartData.push(product);
    }
    return product
};

const removeFromCart = async (product: CartItemType): Promise<CartItemType[]> => {
    const index = cartData.findIndex((item) => item.productId === product.productId);
    if (index !== -1) {
        cartData.splice(index, 1);
    }
    return cartData;
}
const clearCart = async (): Promise<CartItemType[]> => {
    cartData.splice(0, cartData.length);
    return cartData
}


export { getAllCartData, addToCart, removeFromCart, clearCart }