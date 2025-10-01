export const useSetDeleteUrl = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("url_delete", token);
  }
};

export const useGetDeleteUrl = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("url_delete");
  }
  return null;
};

export const useRemoveDeleteUrl = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("url_delete");
  }
};
