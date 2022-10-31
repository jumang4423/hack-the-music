export const FileNameFromPath = (path: string) => {
  const fileName = path.split("/").pop();
  return fileName;
};
