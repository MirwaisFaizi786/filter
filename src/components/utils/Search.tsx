import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { useDebouncedCallback } from "use-debounce";

function Search() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();
  

     const handleSearchChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        if (event.target.value ){
            params.set("search", event.target.value.trim());
            params.set("page", "1");
        }else{
            params.delete("search");

        }
        router.replace(`${pathName}?${params.toString()}`);
        console.log("pathName", pathName);
        
     }, 300)
  return (
    <div className="relative flex items-center">
          <SearchIcon className="absolute left-3 h-5 w-5 text-gray-400 " />
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:outline-none focus:bg-gray-100 placeholder:text-gray-500 placeholder:font-medium"
            placeholder="Search..."
            onChange={handleSearchChange}
          />
        </div>
  )
}

export default Search