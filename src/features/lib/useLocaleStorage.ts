export const setAccess_token = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", token);
  }
};

export const getAccess_token = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

export const clearAccess_token = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
};
