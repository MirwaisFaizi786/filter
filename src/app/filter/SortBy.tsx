"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"; // Import from next/navigation
import React from "react";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface SortByProps {
  name: string;
  value: string;
}

function SortBy({ name, value }: SortByProps) {
  // const [filter, setFilter] = React.useState({ name, value });
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString()); // Update query parameters
  const onClickHandler = () => {
    const newFilter = { name, value }; // Update filter with passed in props
    params.set("sortBy", newFilter.value);
    router.replace(`${pathName}?${params.toString()}`);
    console.log("pathName", pathName);
  };

  return (
    <DropdownMenuItem>
      <button
        onClick={onClickHandler}
        className={cn("text-left w-full block text-sm py-2 rounded", {
          "text-gray-900 bg-gray-100 px-4": params.get("sortBy") === value,
          "text-gray-500  ": params.get("sortBy") !== value,
        })}
      >
        {name}
      </button>
    </DropdownMenuItem>
  );
}

export default SortBy;
