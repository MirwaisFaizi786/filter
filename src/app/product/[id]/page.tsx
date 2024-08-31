import { getProduct } from "@/actions/product/productAction";
import { ProductType } from "@/schema/product/productSchema";

import Button from "./components/Button";
import { addToCart, getAllCartData } from "@/lib/data";
import ProductCarousel from "./components/ProductCarousel";
import { addBasket } from "@/actions/product/basketAction";
import { setCookie } from "@/lib/cookies";
import { cookies } from "next/headers";
import { CartItemType } from "@/types/orderItemType";
import { Cart } from "@/components/store/CartProvider";

async function Product({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const product: ProductType = await getProduct(id);

  const addToBasket = async () => {
    "use server";
   console.log("product page is clallled ");
   
    const item = {
      productId: product.productId,
      quantity: 1,
      imageUrl: product.imageUrl,
      title: product.title,
      unitPrice: product.unitPrice,
      categoryName: product.category?.name,
      brandName: product.brand?.name,
    };
    const initialCart = { items: [] };
    const existingCart = cookies().get("cartStore")?.value ?? JSON.stringify(initialCart);
    const parsedCart: Cart = JSON.parse(existingCart!);
    console.log(
      "parsedCart ---------------------------------------------",
      parsedCart
    );

    const existingItem = parsedCart.items.find(
      (x: CartItemType) => x.productId === item.productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      parsedCart.items.push(item);
    }

    setCookie("cartStore", JSON.stringify(parsedCart));

    return parsedCart;
  };

 

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <section className="mx-auto flex max-w-7xl justify-center flex-col lg:flex-row px-4 sm:px-6 lg:px-8 gap-10">
        {/* Left Section: Image Carousel */}
        <ProductCarousel product={product} />

        {/* Right Section: Product Details */}
        <div className="lg:w-1/4 flex flex-col justify-start p-6  space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-xl text-gray-700">{product.description}</p>
          <p className="text-2xl font-semibold text-red-500">
            ${product.unitPrice}
          </p>

          <div className="flex flex-col space-y-2">
            <p className="text-sm text-gray-500">
              Category:{" "}
              <span className="text-gray-900">{product?.category?.name}</span>
            </p>
            <p className="text-sm text-gray-500">
              Brand:{" "}
              <span className="text-gray-900">{product?.brand?.name}</span>
            </p>
            <p className="text-sm text-gray-500">
              Status:{" "}
              <span
                className={`text-sm font-medium ${
                  product.active ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.active ? "Active" : "Inactive"}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Stock:{" "}
              <span className="text-gray-900">
                {product.unitsInStock} units
              </span>
            </p>
          </div>

          <Button product={product} addToBasket={addToBasket} />
        </div>
      </section>
    </div>
  );
}

export default Product;
