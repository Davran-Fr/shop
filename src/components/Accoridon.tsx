"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

interface AccordionProps {
  title: string;
  content: string;
}

export const Accordion = ({ title, content }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    if (!contentRef.current) return;

    if (isOpen) {
      // Закрыть
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    } else {
      // Открыть
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-300 py-3">
      <button
        onClick={toggleAccordion}
        className="w-full text-left font-medium flex justify-between"
      >
        {title}
        <span>{isOpen ? "−" : "+"}</span>
      </button>
      <div ref={contentRef} className="text-gray-600 h-0 overflow-hidden">
        <p className="py-2">{content}</p>
      </div>
    </div>
  );
};
