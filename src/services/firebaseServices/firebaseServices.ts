import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { toast } from "react-toastify";
import { firebaseStorage } from "./firebase";

export const uploadFile = (file: File, groupId?: string) => {
  return new Promise(function (resolve, reject) {
    let filename = new Date().getTime() + file.name;
    if (groupId) {
      filename = "directory/" + groupId + "/" + filename;
    } else {
      filename = "avatar/" + filename;
    }
    const storageRef = ref(firebaseStorage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast.error(error.message);
        reject(error.message);
      },
      () => {
        try {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            resolve(downloadURL);
          });
        } catch (error) {
          toast.error(error.message);
          reject(error.message);
        }
      },
    );
  });
};
