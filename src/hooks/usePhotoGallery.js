import { useState, useEffect } from "react";
import { isPlatform } from "@ionic/react";

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";
import { Capacitor } from "@capacitor/core";

export function usePhotoGallery({PropName,handleChange}) {
  const [photos, setPhotos] = useState();
  const takePhoto = async () => {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });
    const fileName = new Date().getTime() + ".jpeg";
    const newPhotos = 
    {        
      webviewPath: cameraPhoto.base64String,
    };
    handleChange(PropName,cameraPhoto.base64String)
    setPhotos(newPhotos);
  };
  return {
    photos,
    takePhoto,
  };
}
