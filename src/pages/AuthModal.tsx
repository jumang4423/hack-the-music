import { useCookies } from "react-cookie";
import { useEffect } from "react";
import GenericModal from "../components/GenericModal";
import HackyButton from "../components/HackyButton";
import { AuthWithGoogle } from "./fun_AuthModal";
import { RemoveAllCookies } from "../fun/removeAllCookie";
import { getAuth } from "firebase/auth";

type Props = {
  modalOpen: boolean;
  setModalOpen: (is: boolean) => void;
};

const AuthModal = ({ modalOpen, setModalOpen }: Props) => {
  const [cookies, setCoookie, removeCookie] = useCookies();

  useEffect(() => {
    if (!cookies.user || !cookies.userId || !cookies.accessToken) {
      RemoveAllCookies();
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [cookies.userId, cookies.user, cookies.accessToken]);
  return (
    <div>
      <GenericModal
        open={modalOpen}
        hideCloseButton={true}
        handleClose={() => {}}
        title="☎️ login"
      >
        <div
          style={{
            width: "100%",
            margin: "0 16px 16px 16px",
          }}
        >
          <h2> welcome to hack-the-music </h2>
          <HackyButton
            style={{
              width: "320px",
            }}
            name="login with google"
            prefer={true}
            onClick={() => {
              AuthWithGoogle(setCoookie);
            }}
          />
        </div>
      </GenericModal>
    </div>
  );
};

export default AuthModal;
