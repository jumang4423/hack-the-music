import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { Sample } from "../../../gql/graphql";
import { RandomFiveLengthBinary } from "../../../fun/randomId";
import FireBaseStorage from "../../../fun/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const OnSampleFetch = (
  uploadSample: Sample,
  gameSettings: ChaosGameSettingsType,
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void,
  onClose: () => void,
  setIsUploading: (isUploading: boolean) => void
) => {
  const newGameSettings = Object.assign({}, gameSettings);
  newGameSettings.randomSamples.samples.push({
    url: uploadSample.url,
    description: uploadSample.description,
    idUploadedBy: uploadSample.idUploadedBy,
  });
  setGameSettings(newGameSettings);
  setIsUploading(true);
  onClose();
};

export const SampleUploaderFormvalidation = (
  url: string,
  setSampleError: (bool: boolean) => void,
  desc: string
): boolean => {
  if (url === "") {
    alert("please import a sample");
    return false;
  }
  if (desc === "") {
    setSampleError(true);
    return false;
  }

  setSampleError(false);

  return true;
};

export const UploadSample = async (
  file: File,
  InsertSample: any,
  cookies: { [x: string]: any },
  onClose: () => void,
  desc: string,
  setIsUploading: (bool: boolean) => void
) => {
  setIsUploading(true);
  // upload to firebase storage
  const storageRef = ref(
    FireBaseStorage,
    `samples/${RandomFiveLengthBinary()}_${file.name}`
  );
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);

  // upload to the firestore
  InsertSample({
    variables: {
      url,
      description: desc,
      idUploadedBy: cookies.userId ?? "anonymous",
    },
  });
};
