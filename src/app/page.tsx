import {
  getAllProductBrands,
  getAllProductCategories,
  getAllProducts,
  getFilteredProducts,
} from "@/actions/product/productAction";
import { ProductFilterType } from "@/schema/product/productSchema";
import { CategoryType } from "@/schema/category/categorySchema";
import { BrandType } from "@/schema/Brand/brandSchema";
import ProductFilter from "@/components/product/ProductFilter";
import { Suspense } from "react";
import EmptyFilter from "@/components/product/EmptyFilter";
import ProductCardSkeleton from "@/components/skeleton/ProductCartSkeleton";

export default async function Home() {
  const categories: CategoryType[] = await getAllProductCategories();
  const brands: BrandType[] = await getAllProductBrands();
  const products: ProductFilterType = await getAllProducts();


  const getFilterProducts = async (query: any) => {
    "use server";
    try {
      const filteredProducts = await getFilteredProducts(query);
      console.log("filteredProducts from server action ", filteredProducts);
      return filteredProducts;
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  };
  
 

  return (
    <main className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
      {/* <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link href="/login">SignIn</Link>
        </button>
      </div> */}
  
      <ProductFilter
        categories={categories}
        brands={brands}
        products={products}
        getFilterProducts={getFilterProducts}
      />
    </main>
  );
}
