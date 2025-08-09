import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
interface Props {
  onChange: (e: string) => void;
  value?: string;
  onClear: () => void;
}
const Search = ({ onChange, value, onClear }: Props) => {
  return (
    <div className="relative  w-full lg:w-2/6   h-full">
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value ? value : ""}
        type="text"
        placeholder="Search"
        className="rounded-md px-3 w-full   bg-white border-gray-500 border-1px  font-medium text-lg py-1"
      />
      {value !== "" ? (
        <div
          onClick={onClear}
          className={`absolute z-10 top-1/2    cursor-pointer right-3 text-gray-800 text-lg -translate-y-1/2 `}
        >
          <IoCloseSharp />
        </div>
      ) : (
        <div className="absolute z-10 text-sm top-1/2 right-3 text-gray-500 -translate-y-1/2   ">
          <FaSearch />
        </div>
      )}
    </div>
  );
};

export default Search;
