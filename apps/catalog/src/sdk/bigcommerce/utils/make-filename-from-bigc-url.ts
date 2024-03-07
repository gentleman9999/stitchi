const makeFilenameFromBigCImageUrl = (url: string) => {
  return url.split("/").pop()?.split("__").shift();
};

export default makeFilenameFromBigCImageUrl;
