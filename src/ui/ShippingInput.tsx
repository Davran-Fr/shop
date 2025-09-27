import { changeOrder } from "@/Redux/showOrder";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useDispatch } from "react-redux";
import { OrderState } from "@/Redux/showOrder";

import React, { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutSide";

interface Props {
  value?: string;
  dis?: keyof OrderState;
  error?: FieldError;
  actions: UseFormRegisterReturn;
  type?: string;
  className?: string;
  placeholder?: string;
  data?: string[];
}

export const ShippingInput = ({
  value,
  dis,
  type = "text",
  className,
  placeholder,
  data,
  error,
  actions,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const dispacht = useDispatch();

  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative max-w-[350px]">
      {type === "area" ? (
        <textarea
          className="text-black font-world p-2 min-h-[100px] w-full rounded-md border border-black "
          {...actions}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            if (dis) {
              dispacht(changeOrder({ [dis]: e.target.value }));
            }
            actions.onChange(e);
          }}
        ></textarea>
      ) : (
        <input
          {...actions}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            if (dis) {
              dispacht(changeOrder({ [dis]: e.target.value }));
            }
            actions.onChange(e);
          }}
          onFocus={() => setOpen(true)}
          className={`${className} text-black font-world p-2 w-full rounded-md border border-black`}
        />
      )}

      {open && data && (
        <ul className="absolute font-world custom-scroll bg-white max-h-[300px] overflow-y-scroll border-1px border-black w-full rounded-md mt-1 z-10">
          {data.map((item) => (
            <li
              key={item}
              onClick={() => {
                if (dis) {
                  dispacht(changeOrder({ [dis]: item }));
                }
                actions.onChange({
                  target: { value: item, name: actions.name },
                });
                setOpen(false);
              }}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-500  z-10 text-sm">{error.message}</p>}
    </div>
  );
};
