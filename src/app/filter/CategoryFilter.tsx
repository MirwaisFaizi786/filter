"use client";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/schema/category/categorySchema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

function CategoryFilter({ category }: { category: CategoryType }) {
  const [filter, setFilter] = useState(category);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  const handleItemClick = (category: CategoryType) => {
    const newFilter = { ...category }; // Update filter with passed in props
    setFilter(newFilter);

    // Update query parameters
    
    params.set("categories", newFilter.categoryId.toString());
    router.replace(`${pathName}?${params.toString()}`);
  };
  return (
    <li key={category.categoryId} className="pb-4">
      <button
        onClick={() => handleItemClick(category)}
        className={cn("text-gray-500 hover:text-gray-600", {
          "text-gray-900 underline": Number(params.get("categories"))  === category.categoryId,
          "text-gray-500": filter.categoryId !== category.categoryId,
        })}
      >
        {category.name}
      </button>
    </li>
  );
}

export default CategoryFilter;
