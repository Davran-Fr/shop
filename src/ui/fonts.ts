import { Work_Sans, PT_Serif } from "next/font/google";

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
