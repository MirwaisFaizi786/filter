"use server";
import fetchData from "@/actions/product/genericProductFetch";
import { CartItemType } from "@/types/orderItemType";
export type BasketType = {
    basketId: string;
    items: CartItemType[];
  };
  
export const getBasket = async (basketId: string): Promise<BasketType> => {
    const url = `http://localhost:8080/basket/${basketId}`;
    return fetchData(url);
}



export const addBasket = async ({basketId, items}: {basketId: string, items: CartItemType[]}): Promise<BasketType> => {
  const url = `http://localhost:8080/basket`;
  const data = {basketId, items};
  let response= await fetch(url, { 
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log("result", result);
  
  return result
}