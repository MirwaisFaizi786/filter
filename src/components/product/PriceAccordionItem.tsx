"use client";
import React, { useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { FilterState } from "./ProductFilter";
import { useDebouncedCallback } from "use-debounce";

import { usePathname, useRouter, useSearchParams } from "next/navigation";


type Price = { price: string; min: number; max: number };

interface AccordionProps {
  title: string;
  items: { price: string; min: number; max: number }[];
}

function PriceAccordionItem({
  title,
  items,
}: AccordionProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  const onMinChangeHandler = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      params.set("minPrice", e.target.value);
      router.replace(`${pathName}?${params.toString()}`);
    },
    300
  );

  const onMaxChangeHandler = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      params.set("maxPrice", e.target.value);
      router.replace(`${pathName}?${params.toString()}`);
    },
    300
  );

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, price: Price) => {
    const newFilter = { ...price }; // Clone the passed in price object

    if (event.target.checked) {
      newFilter.min = price.min;
      newFilter.max = price.max;
      params.set("minPrice", newFilter.min.toString());
      params.set("maxPrice", newFilter.max.toString());
    } else {
      // Set to 0 when unchecked
      newFilter.min = 0;
      newFilter.max = 0;

      // Remove from the URL if values are 0
      params.delete("minPrice");
      params.delete("maxPrice");
    }

    // Replace the URL with the updated parameters
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <>
      <AccordionItem value={title}>
        <AccordionTrigger className="flex items-center w-full justify-between text-sm py-3 text-gray-400 hover:text-gray-500">
          <span className="text-gray-900 font-medium">{title}</span>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-4">
            {items.map((item: Price) => (
              <li key={item.price} className="flex items-center">
                <div>
                  <input
                    type="checkbox"
                    onChange={(e) => onChangeHandler(e, item)}
                    checked={
                      params.get("minPrice") === item.min.toString() &&
                      params.get("maxPrice") === item.max.toString()
                    }
                    id={item.price}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={item.price}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {item.price}
                  </label>
                </div>
              </li>
            ))}
            <li>
              <span className="text-gray-900 font-medium text-sm block py-2">Price Range</span>
              <div className="flex justify-between relative">
                <input
                  placeholder="Min"
                  min={0}
                  type="number"
                  onChange={ onMinChangeHandler }
                  className="text-sm text-gray-600 py-2 px-2 w-24 border-r"
                />
                <input
                  placeholder="Max"
                  type="number"
                  onChange={ onMaxChangeHandler }
                  min={0}
                  className="text-sm text-gray-600 py-2 px-2 w-24"
                />
              </div>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}

export default PriceAccordionItem;
