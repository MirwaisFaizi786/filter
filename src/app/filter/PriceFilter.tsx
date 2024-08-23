"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Price = { price: string; min: number; max: number };

function PriceFilter({ price }: { price: Price }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = { ...price }; // Clone the passed in price object

    if (event.target.checked) {
      newFilter.min = price.min;
      newFilter.max = price.max;
      params.set("minPrice", newFilter.min.toString());
      params.set("maxPrice", newFilter.max.toString());
    } else {
      // Set to 0 when unchecked
      newFilter.min = 0;
      newFilter.max = 0;

      // Remove from the URL if values are 0
      params.delete("minPrice");
      params.delete("maxPrice");
    }

    // Replace the URL with the updated parameters
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <li key={price.price} className="flex items-center">
      <div>
        <input
          type="checkbox"
          onChange={onChangeHandler}
          checked={
            params.get("minPrice") === price.min.toString() &&
            params.get("maxPrice") === price.max.toString()
          }
          id={price.price}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor={price.price} className="ml-3 text-sm text-gray-600">
          {price.price}
        </label>
      </div>
    </li>
  );
}

export default PriceFilter;
