import { ChaosGameSettingsType } from "../../../models/chaosGameType";
import { Image } from "../../../gql/graphql";
import { RandomFiveLengthBinary } from "../../../fun/randomId";
import FireBaseStorage from "../../../fun/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const OnImageFetch = (
  uploadImage: Image,
  gameSettings: ChaosGameSettingsType,
  setGameSettings: (gameSettings: ChaosGameSettingsType) => void,
  onClose: () => void,
  setIsUploading: (isUploading: boolean) => void
) => {
  const newGameSettings = Object.assign({}, gameSettings);
  newGameSettings.randomImages.images.push({
    url: uploadImage.url,
    description: uploadImage.description,
    idUploadedBy: uploadImage.idUploadedBy,
  });
  setGameSettings(newGameSettings);
  setIsUploading(true);
  onClose();
};

export const ImageUploaderFormvalidation = (
  url: string,
  setImageError: (bool: boolean) => void,
  desc: string
): boolean => {
  if (url === "") {
    alert("please import a image");
    return false;
  }
  if (desc === "") {
    setImageError(true);
    return false;
  }

  setImageError(false);

  return true;
};

export const UploadImage = async (
  file: File,
  InsertImage: any,
  cookies: { [x: string]: any },
  onClose: () => void,
  desc: string,
  setIsUploading: (bool: boolean) => void
) => {
  setIsUploading(true);
  // upload to firebase storage
  const storageRef = ref(
    FireBaseStorage,
    `images/${RandomFiveLengthBinary()}_${file.name}`
  );
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);

  InsertImage({
    variables: {
      url,
      description: desc,
      idUploadedBy: cookies.userId ?? "anonymous",
    },
  });
};
