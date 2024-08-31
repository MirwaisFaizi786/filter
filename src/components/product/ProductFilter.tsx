"use client";

import { ProductFilterType, ProductType } from "@/schema/product/productSchema";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/skeleton/ProductCartSkeleton";
import { CategoryType } from "@/schema/category/categorySchema";
import { Accordion } from "@/components/ui/accordion";
import { BrandType } from "@/schema/Brand/brandSchema";
import { Suspense, useState } from "react";
import BrandAccordionItem from "./BrandAccordionItem";
import SortByDropdownMenu from "../category/SortByDropdownMenu";
import Search from "../utils/Search";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import PriceAccordionItem from "./PriceAccordionItem";
import EmptyFilter from "./EmptyFilter";
import Link from "next/link";
import CategoryFilterList from "../category/CategoryFilterList";

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
];

// Product Filter
type ProductFilterProps = {
  categories: CategoryType[];
  brands: BrandType[];
  products: ProductFilterType;
};

// Filter State type
export type FilterState = {
  brands: BrandType[];
  category: CategoryType;
  sort: { name: string; value: string };
  priceRange: [number, number];
};

export default function ProductFilter({
  categories,
  brands,
  products,
}: ProductFilterProps) {

  console.log("products", products);

  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8 relative">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8 sticky top-0 z-10 bg-white">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Hello World
        </h1>

        <Search />
        <div className="items-center space-x-8 hidden lg:flex ">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center"
          >
            <span className="text-sm font-medium">
              {showFilter ? "Hide Filters " : "Show Filters"}
            </span>{" "}
            <Filter className="ml-2 h-4 w-4" />
          </button>
          <SortByDropdownMenu
            sortOptions={SORTBY}
          />
        </div>
      </div>

      <section className="pt-6 pb-24 relative">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6  lg:grid-cols-4">
          {/* Filter Section */}
          {showFilter && (
            <div className="hidden lg:block ">
              {/* Category Filter */}
              <div className="sticky top-32  max-h-[calc(100vh-10rem)] overflow-y-auto overflow-x-auto">
                <ul className="space-y-4 text-gray-900 text-sm border-b border-gray-200 pb-6 font-medium">
                  <CategoryFilterList
                    categories={categories}
                   
                  />
                </ul>

                {/* Brand Filter */}
                <Accordion type="multiple" className="w-full animate-none">
                  <BrandAccordionItem title="Brands" items={brands} />
                  {/* Price Filter */}

                  <PriceAccordionItem title="Price" items={PRICELIST} />
                </Accordion>
              </div>
            </div>
          )}
          {/* Products Section */}
          <AnimatePresence>
            <motion.ul
              className={cn(
                "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-3",
                { "lg:col-span-4": !showFilter }
              )}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Suspense
                fallback={
                  <div>
                    {new Array(9).fill(null).map((_, index) => (
                      <ProductCardSkeleton key={index} />
                    ))}
                  </div>
                }
              >
                {products && products?.productList?.length > 0 ? (
                  products?.productList?.map((product: ProductType) => (
                    <motion.li
                      key={product.productId}
                      variants={childVariants}
                      layout
                    >
                      <Link href={`/product/${product.productId}`}>
                        <ProductCard
                          key={product.productId}
                          product={product}
                        />
                      </Link>
                    </motion.li>
                  ))
                ) : (
                  <EmptyFilter />
                )}
              </Suspense>
            </motion.ul>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

const containerVariants = {
  exit: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};
