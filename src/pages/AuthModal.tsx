import { useCookies } from "react-cookie";
import { useEffect } from "react";
import GenericModal from "../components/GenericModal";
import HackyButton from "../components/HackyButton";
import { AuthWithGoogle } from "./fun_AuthModal";
import { RemoveAllCookies } from "../fun/removeAllCookie";

type Props = {
  modalOpen: boolean;
  setModalOpen: (is: boolean) => void;
};

const AuthModal = ({ modalOpen, setModalOpen }: Props) => {
  const [cookies, setCoookie] = useCookies();

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
            padding: "0 16px 16px 16px",
          }}
        >
          <h2> welcome to hack-the-music </h2>
          <div>place to hack your music with friends</div>
          <div> this is yet development version, so please be patient</div>
          <div>i need donation to keep this site running</div>
          <div>
            donate to my bandcamp:{" "}
            <a href="https://jumango.bandcamp.com/">
              https://jumango.bandcamp.com/
            </a>
          </div>

          <div style={{ marginTop: "24px" }} />

          <HackyButton
            style={{ width: "calc(100% - 32px)" }}
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
