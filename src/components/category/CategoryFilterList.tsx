"use client";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/schema/category/categorySchema";
import { FilterState } from "../product/ProductFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";




type CategoryFilterListProps = {
  categories: CategoryType[];
};


function CategoryFilterList({
  categories}: CategoryFilterListProps) {
  

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams.toString());
  const handleItemClick = (category: CategoryType) => {
    params.set("categories", category.categoryId.toString());
    router.replace(`${pathName}?${params.toString()}`);
  };

  
  return (
    <div>
      {categories?.map((category: CategoryType) => (
        <li key={category.categoryId} className="pb-4">
          <button
            onClick={() => handleItemClick(category)}
            className={cn("text-gray-500 hover:text-gray-600", {
              "text-gray-900 underline": Number(params.get("categories")) === category.categoryId,
              "text-gray-500": Number(params.get("categories")) !== category.categoryId,
            })}
          >
            {category.name}
          </button>
        </li>
      ))}
    </div>
  );
}

export default CategoryFilterList;
