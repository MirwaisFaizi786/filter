"use server";
import { cookies } from "next/headers";

// Utility function to make API requests 
async function fetchData(url: string, options: RequestInit = {}) {
  try {
    const headers = new Headers(options.headers);

    // Add authorization header if needed
    const authorizationCookie = cookies().get("Authorization");
    const authorizationValue = authorizationCookie ? authorizationCookie.value : "";
    if (authorizationValue) {
      headers.append("Authorization", authorizationValue);
    }

    // Set default headers
    headers.append("Content-Type", "application/json");

    // Merge headers into options
    const mergedOptions: RequestInit = {
      ...options,
      headers,
    };

    const response = await fetch(url, mergedOptions);

    // Handle unauthorized access
    if (response.status === 403) {
      return { error: "Unauthorized" };
    }

    // Parse JSON response
    const data = await response.json();

    // Handle other errors
    if (!response.ok) {
      throw new Error(data?.message || "An error occurred");
    }

    return data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export default fetchData;
