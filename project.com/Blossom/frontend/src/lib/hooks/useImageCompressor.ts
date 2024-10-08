import imageCompression, { Options } from "browser-image-compression";
import { useState } from "react";

export const useImageCompressor = (maxSizeInMB = 0.1) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const options: Options = {
    maxSizeMB: maxSizeInMB,
    maxWidthOrHeight: 400,
    useWebWorker: true,
    initialQuality: 0.8,
    maxIteration: 100,
  };
  const compressImage = async (imageFile: File) => {
    try {
      setIsLoading(true);
      console.log(
        "Size before compression",
        imageFile.size / 1024 / 1024,
        "MB"
      );
      const compressedFile = await imageCompression(imageFile, options);
      console.log(
        "Size after compression",
        compressedFile.size / 1024 / 1024,
        "MB"
      );
      return compressedFile;
    } catch (error) {
      console.error(error);
      return imageFile;
    } finally {
      setIsLoading(false);
    }
  };
  return { compressImage, isLoading };
};
