import React, { RefObject, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toggleFilter } from "@/Redux/toggleFilterBack";
import { useRouter } from "next/navigation";

interface Props {
  filter: boolean;
  divFilter: RefObject<HTMLDivElement | null>;
}

gsap.registerPlugin(ScrollToPlugin);

const MobileFilterBar = ({ filter, divFilter }: Props) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const filterIcon = useRef<HTMLDivElement>(null);
  const closeIcon = useRef<HTMLDivElement>(null);
  
  const scrollToSection = () => {
    if (divFilter.current) {
      gsap.to(window, {
        duration: 0.5,
        scrollTo: {
          y: 230,
        },
        ease: "power1.out",
      });
    }
  };
  
  return (
    <div className=" w-full flex items-center  relative overflow-hidden justify-between">
      <FaArrowLeft onClick={() => router.back()} />
      <div
        ref={closeIcon}
        className={`absolute ${
          filter ? "translate-y-0" : "-translate-y-full"
        } transition-all duration-300  right-4 top-0`}
      >
        <IoCloseSharp
          onClick={() => {
            dispatch(toggleFilter(false));
          }}
          className="text-3xl"
        />
      </div>
      <div
        ref={filterIcon}
        className={`text-3xl absolute  top-0 transition-all  right-4 duration-300  ${
          filter ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <MdOutlineFilterAlt
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleFilter(true));
            setTimeout(() => {
              scrollToSection();
            }, 50);
          }}
        />
      </div>
    </div>
  );
};

export default MobileFilterBar;
