export const FileNameFromPath = (path: string) => {
  const fileName: string = path.split("/").pop()!;
  // if filename is too long, truncate it
  if (fileName.length > 30) {
    return fileName.substring(0, 30) + "...";
  }

  return fileName;
};
