// @ts-ignore
import Cookies from "js-cookie";

export const RemoveAllCookies = () => {
  const killList = ["user", "accessToken", "userId", "name"];

  killList.forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
};
