// @ts-ignore
import Cookies from "js-cookie";
import GenericModal from "../components/GenericModal";
import { useRecoilState } from "recoil";
import { VolumeAtom } from "../recoil/volumeAtom";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

type Props = {
  modalOpen: boolean;
  setModalOpen: (is: boolean) => void;
};

const GlobalSettingModal = ({ modalOpen, setModalOpen }: Props) => {
  const [volume, setVolume] = useRecoilState(VolumeAtom);

  return (
    <GenericModal
      open={modalOpen}
      handleClose={() => setModalOpen(false)}
      title="🌜 global settings"
    >
      <div
        style={{
          width: "540px",
          padding: "16px",
        }}
      >
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <div> volume </div>
          <VolumeDown />
          <Slider
            aria-label="Volume"
            value={volume}
            onChange={(_, v) => {
              setVolume(v as number);
              Cookies.set("volume", v);
            }}
            min={0.0}
            max={1.0}
            step={0.1}
          />
          <VolumeUp />
        </Stack>
      </div>
    </GenericModal>
  );
};

export default GlobalSettingModal;
