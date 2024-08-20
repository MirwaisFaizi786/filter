"use server";

import fetchData from "./genericProductFetch";

// Get all product categories
export const getAllProductCategories = async () => {
  const url = "http://localhost:8080/category";
  return fetchData(url);
};

// Get all product brands
export const getAllProductBrands = async () => {
  const url = "http://localhost:8080/brand";
  return fetchData(url, { cache: "no-store" });
};

// Get all products
export const getAllProducts = async () => {
  const url = "http://localhost:8080/products";
  return fetchData(url, { cache: "no-store" });
};

// Get filtered products
export const getFilteredProducts = async (queryString: any) => {
  const url = `http://localhost:8080/products?${queryString}`;
  return fetchData(url);
};


export const getProduct = async (productId: number) => {
  const url = `http://localhost:8080/products/${productId}`;
  return fetchData(url);
}