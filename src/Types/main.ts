import { Product } from "@/Types/products";
import { UpdatedType } from "@/validation/validation";

export type ChangeProfilePayload = {
  id: string;
} & UpdatedType;

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin" | string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}
export type UserReqest = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};
export type CategoryResponse = {
  id: number;
  image: string;
  slug: string;
  name: string;
};

export type getAllProductsTypes = {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
};
