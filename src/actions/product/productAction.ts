"use server"
import { cookies } from "next/headers";


export const getAllProductCategories = async () => {
  try {
    let response = await fetch("http://localhost:8080/category", {
      cache: "default",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    let data = await response.json();
    return data;


  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


// Get all product brands
export const getAllProductBrands = async () => {
  try {
    let response = await fetch("http://localhost:8080/brand", {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    let data = await response.json();
    return data;

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}



export const getAllProducts = async () => {
  try {
    const headers = new Headers();
    const authorizationCookie = cookies().get("Authorization");
    const authorizationValue = authorizationCookie ? authorizationCookie.value : "";
    headers.append("Authorization", authorizationValue);

    const response = await fetch("http://localhost:8080/products", {
      cache: "no-store",
      method: "GET",
      headers,
    });

    const data = await response.json();
    
    if (data.status === 403) {
      // Instead of redirecting, return a specific error or status code
      return { error: 'Unauthorized' };
    }
    return data;
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};



export const getFilteredProducts = async (queryString: any) => {
  try {
    const baseUrl = "http://localhost:8080/products";

    const url = `${baseUrl}?${queryString}`;
    // console.log("URL", url);
    

    // Define headers
    const headers = new Headers();
    const authorizationCookie = cookies().get("Authorization");
    const authorizationValue = authorizationCookie ? authorizationCookie.value : "";
    headers.append("Authorization", authorizationValue);

    // Fetch data
    let response = await fetch(url, {
      method: "GET",
      headers
    });
    let data = await response.json(); // Assuming the response is in JSON format
    console.log("filter method asdfasdf" + data);
    
    return data;
  } catch (error : any) {
    
  }
}