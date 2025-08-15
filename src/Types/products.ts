export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Review {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[] ;
  availabilityStatus: string;
  shippingInformation: string;
  warrantyInformation: string;
  returnPolicy: string;
  sku: string;
  minimumOrderQuantity: number;
  weight: number;
  dimensions: Dimensions;
  meta: Meta;
  tags: string[];
  reviews: Review[];
}
