import { forwardRef } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
interface Props {
  value?: string;
  openToggle : () => void,
  onClear : () => void,
  LowToHigh : () => void,
  HighToLow : () => void,
  openOrder : boolean

}
const Order = forwardRef<HTMLDivElement, Props>(({ LowToHigh , HighToLow, value ,openOrder, openToggle  , onClear }, ref) => {
  return (
    <div
      onClick={openToggle}
      ref={ref}
      className="relative w-full lg:w-fit xl:w-[15%]"
    >
      <input
        value={
          value === "asc"
            ? "Low to High "
            : value === "desc"
            ? "High to Low"
            : ""
        }
        readOnly
        type="text"
        placeholder="Order"
        className="rounded-md px-3 w-full  lg:w-full cursor-pointer  bg-white border-gray-500 border-1px  font-medium text-lg p-1"
      />
      {value !== "" ? (
        <div
          onClick={onClear}
          className={`absolute z-10 top-1/2   cursor-pointer right-3 text-gray-800 text-lg -translate-y-1/2 `}
        >
          <IoCloseSharp />
        </div>
      ) : (
        <div
          className={`absolute z-10 top-1/2 right-3  cursor-pointer text-gray-800 -translate-y-1/2  text-sm `}
        >
          <FaChevronDown
            className={`${openOrder ? "rotate-180  " : ""}   duration-200`}
          />
        </div>
      )}
      <ul
        className={`absolute z-30 left-0 w-full text-center  divide-y-[1px] divide-gray-300 bg-white rounded-md border border-gray-500 transform transition-all duration-200 
                  ${
                    openOrder
                      ? " top-12 opacity-100 visible pointer-events-auto"
                      : " top-10 opacity-0 invisible pointer-events-none"
                  }
                `}
      >
        <li
          onClick={LowToHigh}
          className="py-1.5 hover:bg-orderBtn w-full  cursor-pointer "
        >
          Low to High
        </li>
        <li
          onClick={HighToLow}
          className="py-1.5 hover:bg-orderBtn w-full  cursor-pointer "
        >
          High to Low
        </li>
      </ul>
    </div>
  );
});

export default Order;
