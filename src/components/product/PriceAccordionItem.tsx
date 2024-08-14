"use client";
import React, { useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { FilterState } from "./ProductFilter";
import { useDebouncedCallback } from "use-debounce";

type Price = { price: string; min: number; max: number };

interface AccordionProps {
  title: string;
  items: { price: string; min: number; max: number }[];
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
}

function PriceAccordionItem({
  title,
  items,
  filter,
  setFilter,
}: AccordionProps) {

  const onMinChangeHandler = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({
      ...prev,
      priceRange: [
        parseInt(e.target.value),
        prev.priceRange[1],
      ],
    })) 
  }, 300)

  const onMaxChangeHandler = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({
      ...prev,
      priceRange: [
        prev.priceRange[0],
        parseInt(e.target.value),
      ],
    })) 
  }, 300)

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
                    onChange={() =>
                      setFilter((prev) => ({
                        ...prev,
                        priceRange:
                          prev.priceRange[0] === item.min &&
                          prev.priceRange[1] === item.max
                            ? [0, 0]
                            : [item.min, item.max],
                      }))
                    }
                    checked={
                      filter.priceRange[0] === item.min &&
                      filter.priceRange[1] === item.max
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
