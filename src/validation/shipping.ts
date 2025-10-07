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
  name: z
    .string()
    .min(2, { message: "The name need contain minimum 2 letters" }),
  area: z.string().nonempty({ message: "Area is required" }),
  phone: z.string().superRefine((val, ctx) => {
    if (!val.startsWith("+993")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone number must start with +993",
      });
    }
    if (val.length !== 12) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone number must be exactly 12 characters",
      });
    }
  }),
  velayat: z.enum(TURKMEN_VELAYATS, {
    message: "Please select a valid velayat",
  }),

  district: z.enum(TURKMEN_DISTRICTS, {
    message: "Please select a valid district",
  }),
});

export type ShippingType = z.infer<typeof shipping>;
