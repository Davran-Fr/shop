import AddButton from "./ui/AddButton";
import PriceDiscount from "@/ui/PriceDiscount";

import React, { useEffect, useRef, useState } from "react";
import { Rating, Star } from "@smastrom/react-rating";
import { FaChevronDown } from "react-icons/fa";
import { changeNotification, PropsSlice } from "@/Redux/cards";
import { Product } from "@/Types/products";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { usePathname } from "next/navigation";
import { MdQrCode } from "react-icons/md";

import "@smastrom/react-rating/style.css";
import { toggleFilter } from "@/Redux/toggleFilterBack";

interface Props {
  data: Product;
  cards: PropsSlice;
}

const Texts = ({ data }: Props) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [newStock, setNewStock] = useState(0);
  const divDesc = useRef<HTMLDivElement>(null);
  const [description, setDescription] = useState<boolean>(false);
  const selector = useSelector((state: RootState) => state.cardItems);

  useEffect(() => {
    const foundItem = selector.items.find((item) => item.id === data.id);

    if (foundItem) {
      setNewStock(foundItem.stock);
    } else {
      setNewStock(data.stock);
    }
  }, [selector.count, pathname]);

  return (
    <div className="flex flex-col font-medium self-center md:self-start space-y-4 w-full md:w-2/5 lg:w-1/3 ">
      <h2 className="font-world text-2xl 400:text-2xl  xl:text-3xl">
        {data?.title}
      </h2>
      <span >
        <PriceDiscount
          classname="xl:text-4xl text-4xl"
          price={data?.price}
          discountPercentage={data?.discountPercentage}
        />
      </span>
      <div
        ref={divDesc}
        onClick={() => setDescription(!description)}
        className={`${
          description ? "h-auto  flex gap-0.5 max-h-fit" : "h-5 max-h-5"
        }  overflow-hidden duration-200 max-w-[420px] transition-all cursor-pointer relative`}
      >
        <p className={`font-world pr-5 ${description ? "" : "truncate"}`}>
          {data?.description}
        </p>
        <FaChevronDown
          className={`${
            description ? "rotate-180 " : ""
          }  max-w-4 max-h-4 top-1  right-0 z-10 w-full absolute h-full duration-200`}
        />
      </div>
      {data?.rating && (
        <Rating
          itemStyles={{
            itemShapes: Star,
            activeFillColor: "#facc15",
            inactiveFillColor: "#e5e7eb",
          }}
          style={{ maxWidth: 80 }}
          value={parseFloat(data.rating.toFixed(1))}
          readOnly
        />
      )}
      <div>
        <span>Stock: </span>
        <span className="font-bold">{newStock}</span>
      </div>
      <span>
        <span>Shipping Information:</span>
        <span className="font-bold">{data?.shippingInformation} </span>
      </span>
      <div className="">
        <MdQrCode
          onClick={() => {
            dispatch(toggleFilter(true))
          }}
          className="text-5xl cursor-pointer"
        />
      </div>
      <AddButton cards={selector} data={data} />
    </div>
  );
};

export default Texts;
