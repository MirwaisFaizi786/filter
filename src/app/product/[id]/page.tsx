import { getProduct } from "@/actions/product/productAction";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageType, ProductType } from "@/schema/product/productSchema";
import Image from "next/image";

async function Product({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const product: ProductType = await getProduct(id);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      
      <section className="mx-auto flex max-w-7xl justify-center flex-col lg:flex-row px-4 sm:px-6 lg:px-8 gap-10">
        {/* Left Section: Image Carousel */}
        <div className="lg:w-2/4 flex flex-col lg:flex-row gap-6">
          {/* Thumbnail Images */}
          <div className="flex flex-row lg:flex-col gap-2">
            { product && product?.productImages.map((image: ImageType) => (
              <div
                key={image.id}
                className="aspect-square w-20 lg:w-20 bg-gray-200 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-400 cursor-pointer"
              >
                <Image
                  src={`/${image.url}`}
                  alt={image.id.toString()}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain object-center"
                />
              </div>
            ))}
          </div>

          {/* Main Image Carousel */}
          <div className="relative flex-1 overflow-hidden  bg-gray-100 ">
            <Carousel className="h-full w-full">
              <CarouselContent>
                { product && product?.productImages.map((image: ImageType) => (
                  <CarouselItem key={image.id} className="aspect-[4/5] w-96">
                    <Image
                      src={`/${image.url}`}
                      alt={image.id.toString()}
                      width={700}
                      height={700}
                      className="w-full h-full object-contain object-center"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full cursor-pointer hover:bg-opacity-75" />
              <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full cursor-pointer hover:bg-opacity-75" />
            </Carousel>
          </div>
        </div>

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
              <span className="text-gray-900">{product?.category.name}</span>
            </p>
            <p className="text-sm text-gray-500">
              Brand: <span className="text-gray-900">{product?.brand.name}</span>
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

          <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </section>
    </div>
  );
}

export default Product;
