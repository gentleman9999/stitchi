const makeFilenameFromSSImageUrl = (url: string) => {
  return url.split("/").pop()?.split(".").shift();
};

export default makeFilenameFromSSImageUrl;
