import Cookies from "universal-cookie";

export const isAuthenticated = () => {
  const cookie = new Cookies();
  const isUserExist = cookie.get("token");
  if (isUserExist) {
    return true;
  }
  return false;
};
