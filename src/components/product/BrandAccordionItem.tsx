"use client";
import React, { useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { BrandType } from "@/schema/Brand/brandSchema";
import { CategoryType } from "@/schema/category/categorySchema";
import { FilterState } from "./ProductFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


interface AccordionProps {
  title: string;
  items: BrandType[];
}

function BrandAccordionItem({
  title,
  items
}: AccordionProps) {

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, item: BrandType) => {
    // Get current brands from the URL and split them into an array
    const brandsParam = params.get("brands");
    const brandsArray = brandsParam ? brandsParam.split(",").map(Number) : [];

    if (event.target.checked) {
      // Add the new brand to the array if it's checked and not already present
      if (!brandsArray.includes(item.brandId)) {
        brandsArray.push(item.brandId);
      }
    } else {
      // Remove the brand from the array if it's unchecked
      const index = brandsArray.indexOf(item.brandId);
      if (index !== -1) {
        brandsArray.splice(index, 1);
      }
    }

    // If the array is empty, remove the "brands" parameter from the URL, otherwise update it
    if (brandsArray.length > 0) {
      params.set("brands", brandsArray.join(","));
    } else {
      params.delete("brands");
    }

    // Replace the URL with the updated query parameters
    router.replace(`${pathName}?${params.toString()}`);


  };

  // Determine if the brand is checked
  const isChecked = (item: BrandType) => {
    const brandsParam = params.get("brands");
    const brandsArray = brandsParam ? brandsParam.split(",") : [];
    const isChecked = brandsArray.includes(String(item.brandId));
    return isChecked;
  }
 



  return (
    <>
      <AccordionItem value={title}  >
        <AccordionTrigger  className="flex items-center w-full justify-between text-sm py-3 text-gray-400 hover:text-gray-500">
          <span className="text-gray-900 font-medium">{title}</span>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-4">
            {items.map((item: BrandType) => (
              <li key={item.brandId} className="flex items-center">
                <input
                  type="checkbox"
                  onChange={ (event) => onChangeHandler(event, item)}
                  checked={isChecked(item)}
                  id={item.name}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={item.name}
                  className="ml-3 text-sm text-gray-600"
                >
                  {item.name}
                </label>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}

export default BrandAccordionItem;