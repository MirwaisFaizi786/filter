"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React from "react";
import { useDebouncedCallback } from "use-debounce";

function PriceMinMax() {
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
  return (
    <li>
      <span className="text-gray-900 font-medium text-sm block py-2">
        Price Range
      </span>
      <div className="flex justify-between relative">
        <input
          placeholder="Min"
          min={0}
          type="number"
          onChange={onMinChangeHandler}
          className="text-sm text-gray-600 py-2 px-2 w-24 border-r"
        />
        <input
          placeholder="Max"
          type="number"
          onChange={onMaxChangeHandler}
          min={0}
          className="text-sm text-gray-600 py-2 px-2 w-24"
        />
      </div>
    </li>
  );
}

export default PriceMinMax;
