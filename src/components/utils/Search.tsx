"use client";

import { CircleX, SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

function Search() {
  const [isFocused, setIsFocused] = useState(false);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  // Debounced callback to handle search input changes
  const handleSearchChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams.toString());

      if (event.target.value) {
        params.set("search", event.target.value.trim());
      } else {
        params.delete("search");
      }

      router.replace(`${pathName}?${params.toString()}`);
    },
    500
  );

  // Handler to clear the search input
  const onClickHandler = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.replace(`${pathName}?${params.toString()}`);
    reset({ search: "" });
  };

  const { register, reset, formState: { dirtyFields, isDirty } } = useForm({
    defaultValues: {
      search: "",
    },
  });

  

  return (
    <motion.div
    className="relative flex items-center"
    // Animate width based on whether the input is focused or not
    animate={{ width: isFocused ? "400px" : "200px" }}
    initial={{ width: "200px" }}
    transition={{ duration: 0.3 }}
  >
      {/* Search Icon */}
      <SearchIcon className="absolute left-3 h-5 w-5 text-gray-800" />

      {/* Input Field */}
      <input
        type="text"
        className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-full focus:outline-none focus:bg-gray-100 placeholder:text-gray-400 placeholder:font-normal placeholder:text-sm"
        placeholder="Search..."
        { ...register("search", { onChange: handleSearchChange }) }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
     {

       isDirty ? 
          <button className="absolute right-3 h-7 w-7 text-gray-800" onClick={onClickHandler}>
            <CircleX className="h-5 w-5" />
          </button> : null
     } 
     
    </motion.div>
  );
}

export default Search;
