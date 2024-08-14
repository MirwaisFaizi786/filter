"use client";
import { cn } from "@/lib/utils";
import { BrandType } from "@/schema/Brand/brandSchema";
import { CategoryType } from "@/schema/category/categorySchema";
import { FilterState } from "../product/ProductFilter";




type CategoryFilterListProps = {
  categories: CategoryType[];
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
};


function CategoryFilterList({
  categories,
  filter,
  setFilter,

}: CategoryFilterListProps) {
  
  const handleItemClick = (category: CategoryType) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      category: category,
    }));
  };

  
  return (
    <div>
      {categories?.map((category: CategoryType) => (
        <li key={category.categoryId} className="pb-4">
          <button
            onClick={() => handleItemClick(category)}
            className={cn("text-gray-500 hover:text-gray-600", {
              "text-gray-900 underline": filter.category.categoryId === category.categoryId,
              "text-gray-500": filter.category.categoryId !== category.categoryId,
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
