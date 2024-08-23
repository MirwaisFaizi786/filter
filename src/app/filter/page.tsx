import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/skeleton/ProductCartSkeleton";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Search from "@/components/utils/Search";
import {
  getAllProductBrands,
  getAllProductCategories,
  getAllProducts,
  getFilteredProducts,
} from "@/actions/product/productAction";
import { CategoryType } from "@/schema/category/categorySchema";
import { BrandType } from "@/schema/Brand/brandSchema";
import { ProductFilterType, ProductType } from "@/schema/product/productSchema";
import EmptyFilter from "@/components/product/EmptyFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import SortBy from "./SortBy";
import CategoryFilter from "./CategoryFilter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BrandAccordionItem from "@/components/product/BrandAccordionItem";
import BrandFilter from "./BrandFilter";
import PriceFilter from "./PriceFilter";
import PriceMinMax from "./PriceMinMax";
import { Suspense } from "react";
import Loading from "../loading";

const SORTBY = [
  { name: "All", value: "all" },
  { name: "Price: Low to High", value: "priceAsc" },
  { name: "Price: High to Low", value: "priceDesc" },
  { name: "Newest", value: "newest" },
];

const PRICELIST = [
  { price: "$0 - $100", min: 0, max: 100 },
  { price: "$100 - $200", min: 100, max: 200 },
  { price: "$200 - $300", min: 200, max: 300 },
  { price: "$300 - $400", min: 300, max: 400 },
  { price: "$400 - $500", min: 400, max: 500 },
  { price: "Any", min: 0, max: 0 },
];

type Price = { price: string; min: number; max: number };
export default async function ProductFilter({
  searchParams,
}: {
  searchParams: any;
}) {
  const query = new URLSearchParams(searchParams);

  const categories: CategoryType[] = await getAllProductCategories();
  const brands: BrandType[] = await getAllProductBrands();
  const products = await getFilteredProducts(query.toString());

  console.log("query", query);

  return (
    <main className="mx-auto  max-w-7xl  px-4 sm:px-6 lg:px-8 relative">
      <div className="flex items-baseline justify-between border-b border-gray-200 py-6 sticky -top-2 z-10 bg-white">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Hello World
        </h1>

        <Search />
        <div className="items-center space-x-8 hidden lg:flex ">
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="group inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                <span>
                  Sort By:{" "}
                  <span className="text-gray-500">
                    {searchParams.sortBy?.toString()}
                  </span>
                </span>
                <ChevronDown className="-mr-1 ml-1 w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-gray-900" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {SORTBY &&
                  SORTBY?.map((sortBy: { name: string; value: string }) => {
                    return (
                      <SortBy
                        key={sortBy.value}
                        name={sortBy.name}
                        value={sortBy.value}
                      />
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <section className="pt-6 pb-24 ">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6  lg:grid-cols-4">
          {/* Left Filter Section */}
          <div className="hidden lg:block max-h-[calc(100vh-10rem)] overflow-y-auto overflow-x-auto pr-4 sticky top-24 ">
            {/* Category Filter */}

            <ul className="space-y-4 text-gray-900 text-sm border-b border-gray-200 pb-6 font-medium">
              {categories.length &&
                categories?.map((category: CategoryType) => (
                  <CategoryFilter
                    key={category.categoryId}
                    category={category}
                  />
                ))}
            </ul>

            {/* Brand Filter */}
            <Accordion type="multiple" className="w-full animate-none">
              <AccordionItem value="brand">
                <AccordionTrigger className="flex items-center w-full justify-between text-sm py-3 text-gray-400 hover:text-gray-500">
                  <span className="text-gray-900 font-medium">Brands</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4">
                    {brands.length &&
                      brands?.map((brand: BrandType) => (
                        <BrandFilter key={brand.brandId} brand={brand} />
                      ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Price Filter */}

              <AccordionItem value="price">
                <AccordionTrigger className="flex items-center w-full justify-between text-sm py-3 text-gray-400 hover:text-gray-500">
                  <span className="text-gray-900 font-medium">Price</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4">
                    {PRICELIST.map((price: Price) => (
                      <PriceFilter key={price.price} price={price} />
                    ))}
                    <PriceMinMax />
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Products Section */}

          <ul
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-3"
              // { "lg:col-span-4": !showFilter }
            )}
          >
           
              {products && products?.productList?.length > 0 ? (
                products?.productList?.map((product: ProductType) => (
                  <li key={product.productId}>
                    <Link href={`/product/${product.productId}`}>
                      <ProductCard key={product.productId} product={product} />
                    </Link>
                  </li>
                ))
              ) : (
                <EmptyFilter />
              )}
          </ul>
        </div>
      </section>
    </main>
  );
}
