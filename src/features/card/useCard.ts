import {
  useGetAllCategoriesListsQuery,
  useGetChosedCategoriesQuery,
} from "@/Api/ecommerce";
import {  useRef, useState } from "react";
import { SwiperRef } from "swiper/react";

export const actionMainPageCard = () => {
  const [category, setCategory] = useState<string | null>("mens-shirts");
  const swiperRef = useRef<SwiperRef>(null);

  const { data: products, error, isLoading } = useGetChosedCategoriesQuery({
    category: category,
  });
  
  const { data: categories } = useGetAllCategoriesListsQuery();


  const handleMouseDown = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseUp = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return {
    swiperRef,
    setCategory,
    handleMouseDown,
    handleMouseUp,
    products,
    error,
    isLoading,
    categories,
    category,
  };
};
