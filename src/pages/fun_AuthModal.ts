import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const provider = new GoogleAuthProvider();

export const AuthWithGoogle = async (
  setCookie: (cookie: string, vle: string) => void
) => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token: string = credential!.accessToken!;
      setCookie("accessToken", token);
      // The signed-in user info.
      const user = result.user;
      setCookie("userId", user!.uid);
      setCookie("user", JSON.stringify(user));
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};
