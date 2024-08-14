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


interface AccordionProps {
  title: string;
  items: BrandType[];
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
}

function BrandAccordionItem({
  title,
  items,
  filter,
  setFilter,
}: AccordionProps) {
  return (
    <>
      <AccordionItem value={title}  >
        <AccordionTrigger className="flex items-center w-full justify-between text-sm py-3 text-gray-400 hover:text-gray-500">
          <span className="text-gray-900 font-medium">{title}</span>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-4">
            {items.map((item: BrandType) => (
              <li key={item.brandId} className="flex items-center">
                <input
                  type="checkbox"
                  onChange={() =>
                    setFilter((prev) => ({
                      ...prev,
                      brands: prev.brands.find((brand) => brand.brandId === item.brandId)
                        ? prev.brands.filter((brand) => brand.brandId !== item.brandId)
                        : [...prev.brands, item],
                    }))
                  }
                  checked={filter.brands.some((brand) => brand.brandId === item.brandId)}
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