"use client";

import { BrandType } from "@/schema/Brand/brandSchema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

function BrandFilter({ brand }: { brand: BrandType }) {
  const { brandId, name } = brand;

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get current brands from the URL and split them into an array
    const brandsParam = params.get("brands");
    const brandsArray = brandsParam ? brandsParam.split(",").map(Number) : [];

    if (event.target.checked) {
      // Add the new brand to the array if it's checked and not already present
      if (!brandsArray.includes(brandId)) {
        brandsArray.push(brandId);
      }
    } else {
      // Remove the brand from the array if it's unchecked
      const index = brandsArray.indexOf(brandId);
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
  const brandsParam = params.get("brands");
  const brandsArray = brandsParam ? brandsParam.split(",") : [];
  const isChecked = brandsArray.includes(String(brandId));

  return (
    <li key={brandId} className="flex items-center">
      <input
        type="checkbox"
        onChange={onChangeHandler}
        checked={isChecked} // Always controlled
        id={name}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <label htmlFor={name} className="ml-3 text-sm text-gray-600">
        {name}
      </label>
    </li>
  );
}

export default BrandFilter;
