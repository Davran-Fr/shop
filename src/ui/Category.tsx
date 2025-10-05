import { capitalize } from "@/hooks/useFirstLetterCapital";
import React, { forwardRef } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

interface Props {
  value?: string;
  category?: string[];
  openToggle: () => void;
  onClear: () => void;
  onChange: (item: string) => void;
  open: boolean;
}

const Category = forwardRef<HTMLDivElement, Props>(
  ({ open, value, openToggle, onClear, onChange, category }, ref) => {
    return (
      <div
        ref={ref}
        className="relative  w-full lg:w-fit h-full"
        onClick={openToggle}
      >
        <input
          readOnly
          type="text"
          value={value && capitalize(value)}
          placeholder="Categories"
          className="rounded-md px-3 w-full lg:w-fit cursor-pointer bg-white border-gray-500 border-1px  font-medium text-lg p-1"
        />
        {value !== "" ? (
          <div
            onClick={onClear}
            className={`absolute z-10 top-1/2 cursor-pointer right-3 text-gray-800 text-lg -translate-y-1/2 `}
          >
            <IoCloseSharp />
          </div>
        ) : (
          <div
            className={`absolute z-10 top-1/2 right-3 cursor-pointer text-gray-800 -translate-y-1/2  text-sm `}
          >
            <FaChevronDown
              className={`${open && "rotate-180  "}   duration-200`}
            />
          </div>
        )}
        <ul
          className={`absolute z-30 left-0 w-full h-80 lg:h-52 overflow-y-scroll overflow-x-hidden divide-y-[1px] divide-gray-300 bg-white rounded-md border border-gray-500 transform transition-all duration-200 custom-scroll
           ${
             open
               ? " top-12 opacity-100 visible pointer-events-auto"
               : " top-10 opacity-0 invisible pointer-events-none"
           }
         `}
        >
          {category?.map((items, i) => {
            return (
              <li
                key={i}
                onClick={() => onChange(items)}
                className="py-1.5 hover:bg-black/50 hover:text-white w-full  text-center cursor-pointer "
              >
                <span className="block w-full">{capitalize(items)}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

export default Category;
