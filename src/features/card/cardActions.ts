import {
  useGetAllCategoriesListsQuery,
  useGetChosedCategoriesQuery,
  useGetSingleProductQuery,
} from "@/Api/ecommerce";
import { useEffect, useRef, useState } from "react";
import { SwiperRef } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

export const actionGetIdProducts = () => {
  const id = useSelector((state: RootState) => state.quikcView.id);
  const openClose = useSelector((state: RootState) => state.quikcView.open);

  const { data, error, isLoading } = useGetSingleProductQuery(id , {skip : !id});
  return {
    data,
    error,
    isLoading,
    openClose,
  };
};

export const actionMainPageCard = () => {
  const [category, setCategory] = useState("mens-shirts");
  const swiperRef = useRef<SwiperRef>(null);
  const openClose = useSelector((state: RootState) => state.quikcView.open);


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
  useEffect(() => {
      if(openClose === 'open') {
        swiperRef.current?.swiper.autoplay.stop()
      }else if(openClose === 'hidden' || openClose === 'close'){
        swiperRef.current?.swiper.autoplay.start()

      }
  } , [openClose])

  return {
    swiperRef,
    setCategory,
    handleMouseDown,
    handleMouseUp,
    products,
    error,
    isLoading,
    categories,
    category
  };
};
