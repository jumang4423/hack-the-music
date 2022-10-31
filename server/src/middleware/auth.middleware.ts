import { ErrsEnumeration } from "../util/err.util";

// from context, get auth token then validate with firebase authentication
// this allows us to get the user id from the token
// @ts-ignore
export const AuthMiddleware = async (req, res, next) => {
  next();
  return;
  // TODO: implement authentication!
  // unless you will fucking die
  const token = req.headers.authorization;
  if (token) {
    try {
      //      const user = await firebase.auth().verifyIdToken(token);
    } catch (e: unknown) {
      throw new Error(ErrsEnumeration.FIREBASE_UNAUTHORIZED);
    }
  } else {
    throw new Error(ErrsEnumeration.NO_AUTH_TOKEN);
  }

  //

  next();
};
