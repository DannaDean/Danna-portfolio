import defaultImage from "../assets/images/default.jpg";

const getImageSrc = (path, backendUrl) => {
  if (!path) return defaultImage;

  if (path.startsWith("blob:") || path.startsWith("http")) {
    return path;
  }

  return `${backendUrl}${path}`;
};

export default getImageSrc;
