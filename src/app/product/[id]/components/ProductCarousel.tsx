"use client";
import { ImageType, ProductType } from "@/schema/product/productSchema";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

function ProductCarousel({ product }: { product: ProductType }) {
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [activeImage, setActiveImage] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setActiveImage(api.selectedScrollSnap());

    api.on("select", () => {
      setActiveImage(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="lg:w-2/4 flex flex-col lg:flex-row gap-6">
      {/* Thumbnail Images */}
      <div className="flex flex-row lg:flex-col gap-2">
        {product &&
          product?.productImages?.map((image: ImageType, index: number) => (
            <div
              key={image.id}
              onClick={() => handleThumbnailClick(index)}
              className={`aspect-square w-20 lg:w-20 bg-gray-200 rounded-lg overflow-hidden border ${
                activeImage === index ? "border-gray-900" : "border-gray-200"
              } hover:border-gray-400 cursor-pointer`}
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
      <div className="relative flex-1 overflow-hidden bg-gray-100">
        <Carousel setApi={setApi} className="h-full w-full">
          <CarouselContent>
            {product &&
              product?.productImages?.map((image: ImageType) => (
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
  );
}

export default ProductCarousel;
