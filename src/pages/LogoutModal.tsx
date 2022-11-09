import { RemoveAllCookies } from "../fun/removeAllCookie";
import { getAuth, signOut } from "firebase/auth";
import GenericModal from "../components/GenericModal";
import HackyButton from "../components/HackyButton";

type Props = {
  modalOpen: boolean;
  setModalOpen: (is: boolean) => void;
};

const logout = () => {
  RemoveAllCookies();
  signOut(getAuth()).then(() => {
    window.location.reload();
  });
};

const LogoutModal = ({ modalOpen, setModalOpen }: Props) => {
  return (
    <GenericModal
      open={modalOpen}
      handleClose={() => setModalOpen(false)}
      title="🔑 logout for sure?"
    >
      <div
        style={{
          width: "320px",
        }}
      >
        <div
          style={{
            margin: "0px 32px 16px 32px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <HackyButton
            onClick={logout}
            name={"logout"}
            style={{ margin: "8px" }}
            prefer
          />
          <HackyButton
            onClick={() => setModalOpen(false)}
            name={"cancel"}
            style={{ margin: "8px" }}
          />
        </div>
      </div>
    </GenericModal>
  );
};

export default LogoutModal;
