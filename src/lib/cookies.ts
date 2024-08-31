"use server";
import { cookies } from "next/headers";


export const setCookie = (name: string, value: string) => {
    cookies().set(name, value, { httpOnly: true, sameSite: "strict", maxAge: 60 * 60 * 24 * 30 });
};

export const getCookie = (name: string) => {
    return cookies().get(name)?.value;
}