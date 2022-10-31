import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { Button } from "@mui/material";
import { FilePicker } from "react-file-picker";
import InputSimpler from "../../../components/InputSimpler";
import { FileNameFromPath } from "../../../fun/fileNameFromPath";
import { useCookies } from "react-cookie";
import { Cookie } from "universal-cookie";

type Props = {
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
  onClose: () => void;
};

const SampleUploaderModal = ({
  gameSettings,
  setGameSettings,
  onClose,
}: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [descError, setDescError] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [cookies] = useCookies();

  const onSampleUpload = async (cookies: Cookie) => {
    setIsUploading(true);
    if (description === "") {
      setDescError(true);
      return;
    }
    if (!file) {
      return;
    }
    setDescError(false);
    // TODO: upload file to firebase storage
    const uploadedSampleUrl = "https://music/hoge.mp3";
    // TODO: add sample to gameSettings
    const newGameSettings = Object.assign({}, gameSettings);
    newGameSettings.randomSamples.samples.push({
      description: description,
      url: uploadedSampleUrl,
      idUploadedBy: cookies.userId,
    });

    setGameSettings(newGameSettings);
    const userId = cookies.userId;
    setFile(null);
    setDescription("");
    onClose();
  };

  return (
    <div style={{}}>
      <DialogContent dividers>
        <div>upload your sample to the cloud!</div>
        <div>accept only .mp3 file and max file size is 5MB</div>
        <div>* do not upload a sample not made by you, please</div>
        <div>* describe your sample in the fileName and description</div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            margin: "30px 0px 10px 0px",
          }}
        >
          {!file && (
            <FilePicker
              extensions={["mp3"]}
              maxSize={5}
              onChange={(FileObject: File) => {
                setFile(FileObject);
              }}
              onError={(errMsg: string) => alert(errMsg)}
            >
              <Button variant="contained">select</Button>
            </FilePicker>
          )}

          {file && (
            <div
              style={{
                color: "#4b4",
              }}
            >
              {FileNameFromPath(file.name)}
            </div>
          )}

          <div
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <InputSimpler
              title=""
              placeholder="sample description"
              value={description}
              error={descError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onSampleUpload(cookies);
          }}
        >
          {isUploading ? "uploading..." : "upload"}
        </Button>
      </DialogActions>
    </div>
  );
};

export default SampleUploaderModal;
