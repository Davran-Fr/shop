export const useSetOrder = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("orders", token);
  }
};

export const useGetOrder = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("orders");
  }
  return null;
};

export const useRemoveOrder = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("orders");
  }
};
