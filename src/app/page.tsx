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

export default async function Home() {
  const categories: CategoryType[] = await getAllProductCategories();
  const brands: BrandType[] = await getAllProductBrands();
  const products: ProductFilterType = await getAllProducts();


  const getFilterProducts = async (query: any) => {
    "use server";
    try {
      const filteredProducts = await getFilteredProducts(query);
      console.log(filteredProducts);
      return filteredProducts;
    } catch (err) {
      console.error("Error fetching filtered products", err);
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
