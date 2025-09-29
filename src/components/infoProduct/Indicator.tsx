import { useIndicatorAnimation } from "./animation/useIndicatorAnimation";

interface Props {
  onClick: (show: boolean) => void;
}

export const Indicator = ({ onClick }: Props) => {
  const {
    setActive,
    tabRefs,
    active,
    indicatorRef,
    triangleRef,
  } = useIndicatorAnimation();

  return (
    <div className="relative flex gap-4 ">
      {["Reviews", "Recommends"].map((label, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) tabRefs.current[i] = el;
          }}
          onClick={() => {
            setActive(i);
            if (label === "Reviews") {
              onClick(false);
            } else if (label === "Recommends") {
              onClick(true);
            }
          }}
          className={`relative cursor-pointer z-[1] duration-500 ${
            active === i ? "text-white " : "text-black"
          }`}
        >
          <h3
            className={`font-world sm:text-xl rounded-full w-fit h-full py-3 px-5`}
          >
            {label}
          </h3>
        </div>
      ))}
      {/* triangelss and background item*/}
      <div
        ref={indicatorRef}
        className="absolute bottom-0 h-full z-0  bg-black/50 rounded-full"
      />
      <div
        ref={triangleRef}
        className="absolute left-0 w-0 h-0 border-l-[15px] border-l-transparent 
          border-r-[15px] border-r-transparent 
          border-t-[15px] border-black/50"
      />
    </div>
  );
};
