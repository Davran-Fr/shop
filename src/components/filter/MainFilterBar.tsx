"use client";

import { useGetAllCategoriesListsQuery } from "@/Api/ecommerce";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import useClickOutside from "@/hooks/useClickOutSide";
import Prices from "../../ui/Prices";
import Order from "../../ui/Order";
import Category from "../../ui/Category";
import Search from "../../ui/Search";
import { useCategory, usePrices, useOrder, useSearch } from "../../features/filters/filter";
import { useWidth } from "@/hooks/useWidth";
import { useOverFlow } from "@/hooks/overFlow";
import MobileFilterBar from "./MobileFilterBar";
import { toggleFilter } from "@/Redux/toggleFilterBack";
import { Container } from "@/ui/Container";

const Filter = () => {
  const dispatch = useDispatch();
  const width = useWidth();
  const divCategory = useRef<HTMLDivElement | null>(null);
  const divOrder = useRef<HTMLDivElement | null>(null);
  const divFilter = useRef<HTMLDivElement | null>(null);
  const filterBase = useSelector((state: RootState) => state.filter);
  const filterBack = useSelector((state: RootState) => state.toggleFilter);

  const { data: categories } = useGetAllCategoriesListsQuery();

  const { clearSearch, onChangeSearch } = useSearch(dispatch);
  const {
    handleMaxChange,
    handleMinChange,
    clearMinPrice,
    clearMaxPrice,
  } = usePrices(dispatch);
  const {
    open,
    onChangeCategory,
    toggleOpen,
    setOpen,
    clearCategory,
  } = useCategory(dispatch);
  const {
    openOrder,
    toggleOpenOrder,
    lowToHigh,
    highToLow,
    setOpenOrder,
    onClearOrder,
  } = useOrder(dispatch);

  useClickOutside(divCategory, () => setOpen(false));
  useClickOutside(divOrder, () => setOpenOrder(false));
  useClickOutside(divFilter, () => dispatch(toggleFilter(false)));
  useOverFlow(filterBack.filter);
  const animation = `${

    filterBack.filter
      ? "visible pointer-events-auto  delay translate-y-full"
      : "invisible  pointer-events-none -translate-y-10  "
  }`;


  return (
    <Container className="relative bg-white z-30 w-full font-world flex items-center gap-5 lg:gap-0">
      <div className=" lg:hidden  py-7 z-40 relative overflow-hidden text-2xl bg-white w-full items-center">
        <MobileFilterBar filter={filterBack.filter} divFilter={divFilter} />
      </div>
      <div
        ref={divFilter}
        className={`absolute ${
          width < 1024 && animation
        }  lg:relative ease-in-out lg:border-none border-b-1px border-gray-500 transition-all duration-500 flex lg:flex-row flex-col lg:justify-between bg-white gap-5 pb-10 lg:py-10  bottom-0 left-0 z-30 w-full`}
      >
        <Search
          value={filterBase.search}
          onClear={clearSearch}
          onChange={(e) => onChangeSearch(e)}
        />
        <Category
          ref={divCategory}
          onChange={(items) => {
            onChangeCategory(items);
          }}
          onClear={clearCategory}
          open={open}
          openToggle={toggleOpen}
          category={categories}
          value={filterBase.category}
        />
        <Order
          ref={divOrder}
          openOrder={openOrder}
          onClear={onClearOrder}
          LowToHigh={lowToHigh}
          HighToLow={highToLow}
          value={filterBase.order}
          openToggle={toggleOpenOrder}
        />
        <div className="flex w-full lg:w-fit gap-5 relative  justify-between">
          <Prices
            placeholder="Min Price"
            value={filterBase.minPrice}
            onChange={handleMinChange}
            onClear={clearMinPrice}
          />
          <Prices
            placeholder="Max Price"
            value={filterBase.maxPrice}
            onChange={handleMaxChange}
            onClear={clearMaxPrice}
          />
        </div>
      </div>
    </Container>
  );
};

export default Filter;
