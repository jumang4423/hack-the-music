import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { FilePicker } from "react-file-picker";
import { Button } from "@mui/material";
import InputSimpler from "../../../components/InputSimpler";
import { useCookies } from "react-cookie";
import { useMutation } from "@apollo/client";
import { INSERT_SAMPLE } from "../../../fun/apis";
import {
  OnSampleFetch,
  SampleUploaderFormvalidation,
  UploadSample,
} from "./fun_SampleUploaderModal";

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
  const [InsertSample] = useMutation(INSERT_SAMPLE, {
    onCompleted({ uploadSample }) {
      OnSampleFetch(
        uploadSample,
        gameSettings,
        setGameSettings,
        onClose,
        setIsUploading
      );
    },
    onError(error) {
      console.log(error);
    },
  });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [descError, setDescError] = useState<boolean>(false);
  const [cookies] = useCookies();

  return (
    <div style={{}}>
      <DialogContent dividers>
        <div>upload your sample to the cloud!</div>
        <div>accept only .mp3 file and max file size is 5MB</div>
        <div>* do not upload a sample not made by you, please</div>
        <div>* describe your sample in description</div>
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
                FileObject.type === "audio/mp3";
                setFile(FileObject);
              }}
              onError={(errMsg: string) => alert(errMsg)}
            >
              <Button variant="contained">import</Button>
            </FilePicker>
          )}

          {file && (
            <div
              style={{
                color: "#4b4",
              }}
            >
              imported
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
          disabled={isUploading}
          onClick={() => {
            SampleUploaderFormvalidation(
              file ? "ok" : "",
              setDescError,
              description
            ) &&
              UploadSample(
                file!,
                InsertSample,
                cookies,
                onClose,
                description,
                setIsUploading
              );
          }}
        >
          {isUploading ? "uploading..." : "upload"}
        </Button>
      </DialogActions>
    </div>
  );
};

export default SampleUploaderModal;
