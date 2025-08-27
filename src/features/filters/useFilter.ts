import { useGetProductsFilteredQuery } from "@/Api/ecommerce";
import { changeFilter } from "@/Redux/filterBase";
import { RootState } from "@/Redux/store";
import { getAllProductsTypes } from "@/Types/main";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const productsFiltiration = () => {
  const [filtered, setFiltered] = useState<getAllProductsTypes>();
  const dispatch = useDispatch();
  const router = useRouter();
  const filterBase = useSelector((state: RootState) => state.filter);

  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  const {
    search,
    minPrice,
    maxPrice,
    page,
    itemsPerPage,
    ...checked
  } = filterBase; // take search , minPrice , maxPrice out from filterbase For apppi searchh
  const { data, error, isLoading } = useGetProductsFilteredQuery(checked); //filtereed bases

  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  const searchWords = (filterBase.search || "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  const searchedProducts = useMemo(() => {
    if (!data) return [];

    return data.products.filter((item) => {
      const matchesSearch = searchWords.every((word) =>
        item.title.toLowerCase().includes(word)
      );
      const matchesPrice =
        (typeof minPrice === "number" ? item.price >= minPrice : true) &&
        (typeof maxPrice === "number" && maxPrice > 0
          ? item.price <= maxPrice
          : true);

      return matchesSearch && matchesPrice;
    });
  }, [data, filterBase.search, filterBase.minPrice, filterBase.maxPrice]);

  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  const startIndex = ((filterBase.page || 1) - 1) * 8;
  const selectedItems = searchedProducts.slice(startIndex, startIndex + 8);

  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  useEffect(() => {
    if (!data) return;
    const handler = setTimeout(() => {
      setFiltered({ ...data, products: selectedItems });
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [
    data,
    searchedProducts,
    page,
    filterBase.search,
    filterBase.category,
    filterBase.minPrice,
    filterBase.maxPrice,
  ]);

  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  useEffect(() => {
    dispatch(changeFilter({ page: 1 }));
  }, [searchedProducts]);

  //////////// ---- ---- ---- ---- ---- ---- ---- ////////////////// ---- ---- ---- ---- ---- ---- ---- ---- ///////////

  return {
    filtered,
    page,
    selectedItems,
    searchedProducts,
    error,
    data,
    isLoading,
  };
};

export default productsFiltiration;
