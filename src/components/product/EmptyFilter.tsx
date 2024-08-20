"use client";

import { XCircle } from "lucide-react";

function EmptyFilter() {
  return (
    <div className="relative col-span-full bg-gray-50 w-full p-10 flex flex-col justify-center items-center">
     <XCircle className="w-10 h-10 text-gray-400" />
      <h3 className="text-2xl font-semibold">No Products Found</h3>
      <p className="text-gray-500">Try different keywords</p>
    </div>
  )
}

export default EmptyFilter