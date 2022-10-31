import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { firebaseStorage } from "./firebase";

export const uploadFile = (file: File, isAvatar: boolean = false) => {
  return new Promise(function (resolve, reject) {
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(firebaseStorage);
  });
};
