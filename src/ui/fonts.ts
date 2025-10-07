import { Work_Sans, PT_Serif } from "next/font/google";

import { Playfair_Display } from "next/font/google";

export const playfairDisplay = Playfair_Display({
  variable: "--font-playfairDisplay",
  weight: ["400", "500", "600", "700"],
  subsets: ['cyrillic'],
});

export const WorkSansFonts = Work_Sans({
  variable: "--font-workSans",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["vietnamese"],
});

export const PtSerifts = PT_Serif({
  variable: "--font-workSans",
  weight: ["400", "700"],
  subsets: ["cyrillic-ext"],
});
