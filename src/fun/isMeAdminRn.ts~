// @ts-ignore
import Cookies from "js-cookie";
import { Group } from "../gql/graphql";

export const IsMeAdminRn = (group: Group) => {
  const userIdFromCookie = Cookies.get("userId");
  if (!userIdFromCookie) {
    return false;
  }
  const adminUserId = group.adminUserId;

  return userIdFromCookie === adminUserId;
};
