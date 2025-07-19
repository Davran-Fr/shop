import React, { useRef } from "react";
import gsap from "gsap";

export default function AnimatedButton() {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const dd = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current || !dd.current) return;

    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const halfWidth = dd.current.offsetWidth / 1.2;
    const halfHeight = dd.current.offsetHeight / 1.9;

    gsap.to(dd.current, {
      x: x - halfWidth,
      y: y - halfHeight,
      duration: 0.8,
      ease: "power3.out",
      scale: 1
      
    });
  };

  const handleMouseLeave = () => {
    if (!dd.current) return;

    gsap.to(dd.current, {
      duration: 0.5,
      scale : 0,
      ease: "power3.out",
    });
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: "1rem 2rem",
        fontSize: "1.2rem",
        cursor: "pointer",
        borderRadius: "8px",
        backgroundColor: "#4caf50",
        color: "white",
        border: "none",
        outline: "none",
      }}
      className="relative overflow-hidden"
    >
      <div ref={dd} className="bg-red-400 rounded-full h-20 w-20 absolute ">
        {" "}
      </div>
      <p className="relative z-30">

      Наведи и двигай мышь внутри
      </p>
    </button>
  );
}
