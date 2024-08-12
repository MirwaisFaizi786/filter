import { ProductType } from "@/schema/product/productSchema";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const ProductCard = React.memo(({ product }: { product: ProductType }) => {
  const { imageUrl, title, description, unitPrice, productId} = product;

  const cardVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5, // Adjust duration as needed
        ease: "easeInOut",
      },
    },
  };

  const imageVariants = {
    initial: {
      height: "auto",
      width: "auto",
    },
    animate: {
      height: "100%",
      width: "100%",
      transition: {
        duration: 0.5, // Adjust duration as needed
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="group relative"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      style={{ willChange: "width, height" }} // Hint to browser for optimization
    >
      <motion.div
        className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 lg:h-80 lg:aspect-none group-hover:opacity-75"
        variants={imageVariants}
        initial="initial"
        animate="animate"
        style={{ willChange: 'width, height' }} // Hint to browser for optimization
        layoutId={productId.toString()} // For smoother transitions
      >
        <motion.img
          className="w-full h-full object-contain object-center"
          src={`${imageUrl}`}
          alt={title}
          width={500} // Replace with actual image dimensions
          height={500} // Replace with actual image dimensions
          // priority // If using Next/Image
          // placeholder="blur" // If using Next/Image
        />
      </motion.div>
      <div className="mt-4 flex justify-between">
        <div>
          <motion.h3
            className="text-sm text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            layout // For smooth font size transitions
          >
            {title}
          </motion.h3>
          <motion.p
            className="mt-1 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            layout
          >
            {description}
          </motion.p>
        </div>
        <motion.p
          className="text-sm font-medium text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          layout
        >
          {unitPrice}
        </motion.p>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
