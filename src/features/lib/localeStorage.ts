export const setAccess_token = (token: string) => {
  localStorage.setItem("access_token", token);
};
export const getAccess_token = () => localStorage.getItem("access_token");
export const clearAccess_token = () => localStorage.removeItem("access_token");

export const setId_User = (id: number) => {
  localStorage.setItem("user_id", JSON.stringify(id));
};
export const getId_User = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user_id");
  }
  return null; // или другое дефолтное значение для сервера
};

export const clearId_User = () => localStorage.removeItem("user_id");
