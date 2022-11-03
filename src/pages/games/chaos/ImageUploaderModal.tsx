import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { FilePicker } from "react-file-picker";
import { Button } from "@mui/material";
import InputSimpler from "../../../components/InputSimpler";
import { FileNameFromPath } from "../../../fun/fileNameFromPath";
import { useCookies } from "react-cookie";
import { useMutation } from "@apollo/client";
import { INSERT_IMAGE } from "../../../fun/apis";
import {
  OnImageFetch,
  ImageUploaderFormvalidation,
  UploadImage,
} from "./fun_ImageUploaderModal";

type Props = {
  gameSettings: ChaosGameSettingsType;
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void;
  onClose: () => void;
};

const ImageUploaderModal = ({
  gameSettings,
  setGameSettings,
  onClose,
}: Props) => {
  const [InsertImage] = useMutation(INSERT_IMAGE, {
    onCompleted({ uploadImage }) {
      OnImageFetch(
        uploadImage,
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
        <div>upload your image to the cloud!</div>
        <div>accept only .png file and max file size is 5MB</div>
        <div>* describe your image in description</div>
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
              extensions={["png"]}
              maxSize={5}
              onChange={(FileObject: File) => {
                FileObject.type === "image/png";
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
              placeholder="image description"
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
            ImageUploaderFormvalidation(
              file ? "ok" : "",
              setDescError,
              description
            ) &&
              UploadImage(
                file!,
                InsertImage,
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

export default ImageUploaderModal;
