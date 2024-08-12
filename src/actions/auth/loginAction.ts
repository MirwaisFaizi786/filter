"use server";
import { LoginFormType } from "@/schema/auth/loginSchema";
import { cookies } from "next/headers";



export const login = async (formData: LoginFormType) => {
    try {
        let headersList = {
            "Accept": "*/*",
            "Authorization": `Basic ${btoa(formData.email + ":" + formData.password)}`
        };
        
        let response = await fetch("http://localhost:8080/secret", { 
            method: "GET",
            headers: headersList
        });
        
        let authorizationHeader = response.headers?.get("Authorization");

        // Ensure the value is a string, or handle the null case
        if (authorizationHeader) {
            cookies().set("Authorization", authorizationHeader, { httpOnly: true });
        } else {
            console.log("Authorization header is missing.");
        }
        // console.log(cookies().get("Authorization")?.value);
    } catch (error) {
        console.log(error);
    }
}
