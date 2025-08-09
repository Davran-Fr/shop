import React from "react";
import { IoCloseSharp } from "react-icons/io5";
interface Props {
  value?: number ;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder : string
}
const Prices = ({ value, onChange, onClear  , placeholder}: Props) => {
  return (
    <div className="relative w-full ">
      <input
        type="number"
        placeholder={placeholder}
        onChange={onChange}
        value={value === 0 ? "" : value}
        className=" rounded-md w-full h-full p-1  border-1px px-3 border-gray-500 "
        onWheel={(e) => e.currentTarget.blur()}
        min={0}
        step={1}
      />
      {value !== 0 && (
        <div
          onClick={onClear}
          className="absolute z-10 top-1/2  cursor-pointer  right-3 text-gray-800 -translate-y-1/2   "
        >
          <IoCloseSharp />
        </div>
      )}
    </div>
  );
};

export default Prices;
