import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBT06MA_Pf2fXrhS6ALqid-Qbern-RX7hc",
  authDomain: "company-management-c3762.firebaseapp.com",
  projectId: "company-management-c3762",
  storageBucket: "company-management-c3762.appspot.com",
  messagingSenderId: "1871638285",
  appId: "1:1871638285:web:c3baf5e8cb932ef5d40a44",
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(firebaseApp);
