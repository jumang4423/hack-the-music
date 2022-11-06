// @ts-ignore
import Cookies from "js-cookie";

export const RemoveAllCookies = () => {
  const killList = ["user", "accessToken", "userId"];

  killList.forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
};
