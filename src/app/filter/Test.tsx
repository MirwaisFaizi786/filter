"use client"

import { getAllProductBrands } from "@/actions/product/productAction";
import { BrandType } from "@/schema/Brand/brandSchema";

export function ClientTest({children}: {children: React.ReactNode}) {
    return (
      <div>{children}</div>
    )
  }


"use server"
async function Test() {
    const brands: BrandType[] = await getAllProductBrands();
  return (
    <ClientTest>
       <div>
        {
          brands.map((brand) => {
            return <p key={brand.brandId}>{brand.name}</p>
          })
        }
       </div>
    </ClientTest>
  )
}

export default Test











