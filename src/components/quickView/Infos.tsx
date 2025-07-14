import React from "react";
import { QuickViewProps } from "./QuickView";
import Image from "next/image";
import { animation, checkPricePercentage } from "./animation";
import { Rating, Star } from "@smastrom/react-rating";

export const QuickViewImages = ({ data }: QuickViewProps) => {
  const { images, image, setImage } = animation({ data: data });

  return (
    <div className=" flex w-full   lg:flex-row flex-col-reverse  gap-1.5  lg:w-1/2">
      <div
        className={`${
          data?.images && data.images.length > 1 ? "flex " : "hidden"
        }   lg:flex-col justify-center   gap-3  h-full w-full lg:w-1/3`}
      >
        {images?.map((items, i) => {
          if (i === image) return null;
          return (
            <div className="p-2 relative rounded-xl flex items-center justify-center  overflow-hidden ">
              <div className="bg-white/25 blur-xl lg:w-20 lg:h-20 w-14 h-14 rounded-full  absolute top-1/2 left-1/2 z-0 transform -translate-y-1/2 -translate-x-1/2">
                dw
              </div>
              <Image
                onClick={() => setImage(i)}
                alt="test"
                className="500:w-20 500:h-20  w-14 h-14  relative z-10 object-cover"
                width={800}
                height={800}
                src={`${items}`}
              />
            </div>
          );
        })}
      </div>
      <div className="bg-yellow px-4 w-full flex items-center  justify-center ">
        <div className="   rounded-xl relative">
          <div
            className={`bg-white/25 blur-xl  h-52 ${
              images.length === 0 ? " w-full" : "w-52"
            } rounded-full  absolute top-1/2 left-1/2 z-0 transform -translate-y-1/2 -translate-x-1/2`}
          ></div>
          {images[image] && (
            <Image
              alt="main"
              src={images[image]}
              width={800}
              height={800}
              className="w-full  h-52  sm:h-72 relative z-10 object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const QuickViewText = ({ data }: QuickViewProps) => {
  const { discountPrice } = checkPricePercentage({ data: data });
  return (
    <div className="lg:w-1/2 w-full space-y-3 lg:px-5 ">
      <table className=" border-separate border-spacing-y-3 w-full ">
        <tbody>
          <ThTd name="Name:">{data?.title}</ThTd>
          <ThTd name="Description:">{data?.description}</ThTd>
          <ThTd name="Price:">
            {discountPrice && (
              <span className="  text-lg font-workSans  ">
                {discountPrice.toFixed(2)}$
              </span>
            )}
            <span
              className={`${
                data?.discountPercentage
                  ? "line-through text-textBlue ml-1 text-sm"
                  : "text-lg text-white"
              } `}
            >
              {data?.price}$
            </span>
          </ThTd>
          <ThTd name="Rating:">
            {" "}
            {data?.rating && (
              <Rating
                itemStyles={{
                  itemShapes: Star,
                  activeFillColor: "#facc15",
                  inactiveFillColor: "#e5e7eb",
                }}
                style={{ maxWidth: 70 }}
                value={parseFloat(data.rating.toFixed(1))}
                readOnly
              />
            )}
          </ThTd>
          <ThTd device="desktop" name="Stock: ">
            {data?.stock}
          </ThTd>
        </tbody>
      </table>
      <button className="py-2 rounded-xl px-5 w-full bg-orderBtn text-white text-sm">
        Add
      </button>
      <button className="py-2 rounded-xl px-5 w-full bg-orderBtn text-white text-sm">
        More Info
      </button>
    </div>
  );
};

export const ThTd = ({
  name,
  device,
  children,
}: {
  name: string;
  device?: string;
  children: React.ReactNode;
}) => {
  return (
    <tr className={`${device === "desktop" && "lg:block hidden "}`}>
      <th className="text-sm ">{name}</th>
      <td className="pl-3 text-sm  w-full font-medium">{children} </td>
    </tr>
  );
};
