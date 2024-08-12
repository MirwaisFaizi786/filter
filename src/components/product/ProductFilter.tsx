"use client";

import { ProductFilterType, ProductType } from "@/schema/product/productSchema";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/skeleton/ProductCartSkeleton";
import { CategoryType } from "@/schema/category/categorySchema";
import CategoryFilterList from "@/components/category/CategoryFilterList";
import { Accordion } from "@/components/ui/accordion";
import { BrandType } from "@/schema/Brand/brandSchema";
import { useCallback, useEffect, useState } from "react";
import BrandAccordionItem from "./BrandAccordionItem";
import SortByDropdownMenu from "../category/SortByDropdownMenu";
import Search from "../utils/Search";
import { useSearchParams } from "next/navigation";
import { getFilteredProducts } from "@/actions/product/productAction";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const SORTBY = [
  { name: "Price: Low to High", value: "priceAsc" },
  { name: "Price: High to Low", value: "priceDesc" },
  { name: "Newest", value: "newest" },
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
};

export default function ProductFilter({
  categories,
  brands,
  products,
}: ProductFilterProps) {
  const [productList, setProductList] = useState<ProductFilterType>(products);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState<FilterState>({
    brands: [],
    category: {} as CategoryType,
    sort: SORTBY[0],
  });
  

  const searchParams = useSearchParams();

  const buildQuery = useCallback(() => {
    const filteredQuery: Record<string, string> = {
      ...(searchParams.get("search")? { search: searchParams.get("search")!}: {}),
      ...(filter.sort.value ? { sortBy: filter.sort.value } : {}),
      ...(filter.brands.length > 0
        ? {
            brands: filter.brands
              .map((brand) => brand.brandId.toString())
              .join(","),
          }
        : {}),
      ...(filter.category.categoryId
        ? { categories: filter.category.categoryId.toString() }
        : {}),
    };

    return new URLSearchParams(filteredQuery).toString();
  }, [filter, searchParams]);

  useEffect(() => {
    const query = buildQuery();
    async function filterProducts() {
      try {
        const filteredProducts = await getFilteredProducts(query);
        setProductList(filteredProducts);
      } catch (err) {
        console.error("Error fetching filtered products", err);
      }
    }
    filterProducts();
  }, [filter, buildQuery]);



  return (
    <main className="mx-auto  max-w-7xl  px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Hello World
        </h1>

        <Search />
        <div className="items-center space-x-8 hidden lg:flex">
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
            setFilter={setFilter}
            filter={filter}
            sortOptions={SORTBY}
          />
        </div>
      </div>

      <section className="pt-6 pb-24">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6  lg:grid-cols-4 ">
          {/* Filter Section */}

          {showFilter && (
            <div className="hidden lg:block sticky">
              {/* Category Filter */}
              <ul className="space-y-4 text-gray-900 text-sm border-b border-gray-200 pb-6 font-medium">
                <CategoryFilterList
                  categories={categories}
                  setFilter={setFilter}
                  filter={filter}
                />
              </ul>

              {/* Brand Filter */}
              <Accordion type="multiple" className="w-full animate-none">
                <BrandAccordionItem
                  title="Brands"
                  items={brands}
                  setFilter={setFilter}
                  filter={filter}
                />
              </Accordion>
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
              {productList?.productList
                ? productList?.productList?.map((product: ProductType) => (
                    <motion.li
                      key={product.productId}
                      variants={childVariants}
                      layout
                    >
                      <ProductCard key={product.productId} product={product} />
                    </motion.li>
                  ))
                : new Array(9)
                    .fill(null)
                    .map((_, index) => <ProductCardSkeleton key={index} />)}
            </motion.ul>
          </AnimatePresence>
        </div>
      </section>
    </main>
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