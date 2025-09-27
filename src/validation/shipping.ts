import { z } from "zod";

export const TURKMEN_VELAYATS = [
  "Ahal",
  "Balkan",
  "Dashoguz",
  "Lebap",
  "Mary",
  "Ashgabat",
] as const;

export const TURKMEN_DISTRICTS = [
  "Ak bugdaý",
  "Babadaýhan",
  "Bäherden",
  "Gökdepe",
  "Kaka",
  "Sarahs",
  "Tejen",

  "Bereket",
  "Esenguly",
  "Etrek",
  "Gyzylarbat",
  "Magtymguly",
  "Türkmenbaşy",

  "Akdepe",
  "Boldumsaz",
  "Görogly",
  "Köneürgenç",
  "Ruhubelent",
  "Shabat",

  "Çärjew",
  "Dänew",
  "Darganata",
  "Halaç",
  "Hojambaz",
  "Kerki",
  "Köýtendag",
  "Aşgabat",
  "Bayramaly",
  "Karakum",
  "Mary",
  "Murghab",
  "Sakarçaga",
  "Turkmenkala",
  "Takhtabazar",
  "Vekilbazar",
  "Yolotan",

  "Bagtyýarlyk",
  "Berkararlyk",
  "Büzmeýin",
  "Köpetdag",
] as const;

export const shipping = z.object({
  name: z.string({ message: "The name need contain minimum 2 letters" }).min(2),
  area: z.string().nonempty({ message: "Area is required" }),
  phone: z.string().min(2),
  velayat: z.enum(TURKMEN_VELAYATS, {
    errorMap: () => ({ message: "Please select a valid velayat" }),
  }),
  districts: z.enum(TURKMEN_DISTRICTS, {
    errorMap: () => ({ message: "Please select a valid district" }),
  }),
});

export type ShippingType = z.infer<typeof shipping>;
