export type ProductParams = {
  category?: string;
  sortBy?: string;
  order?: string;
  limit?: number;
  skip?: number;
  select?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page? :number
  itemsPerPage ?: number 
};
