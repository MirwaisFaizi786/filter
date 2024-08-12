"use client";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { FilterState } from "../product/ProductFilter";

type SortByDropdownMenuProps = {
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  filter: FilterState;
  sortOptions: { name: string; value: string }[];
};

function SortByDropdownMenu({setFilter,filter, sortOptions}: SortByDropdownMenuProps) {

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="group inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
          <span>
            Sort By: <span className="text-gray-500">{filter.sort.name}</span>
          </span>
          <ChevronDown className="-mr-1 ml-1 w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-gray-900" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
        >
          
            {sortOptions &&
              sortOptions.map((sortBy: { name: string; value: string }) => {
                return (
                  <DropdownMenuItem key={sortBy.value}>
                  <button
                    onClick={() => setFilter({ ...filter, sort: sortBy })}
                    className={cn("text-left w-full block  text-sm  py-2 rounded", {
                      "text-gray-900 bg-gray-100": filter.sort.value === sortBy.value,
                      "text-gray-500": filter.sort.value !== sortBy.value,
                    })}
                  >
                    {sortBy.name}
                  </button>
                  </DropdownMenuItem>
                );
              })}
         
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SortByDropdownMenu;
