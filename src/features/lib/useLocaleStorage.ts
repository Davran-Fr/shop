export const setAccess_token = (token: string) => {
  localStorage.setItem("access_token", token);
};
export const getAccess_token = () => localStorage.getItem("access_token");
export const clearAccess_token = () => localStorage.removeItem("access_token");

