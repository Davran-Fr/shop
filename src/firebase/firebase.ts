import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBAcMWGQsqvYXHWUPDm6-muSdDzUt1RLAw",
  authDomain: "shop-557f5.firebaseapp.com",
  projectId: "shop-557f5",
  storageBucket: "shop-557f5.appspot.com", // исправлено .appspot.com

  messagingSenderId: "233716637209",
  appId: "1:233716637209:web:9371517b5501a10f211488",
  measurementId: "G-DE9HM9MXCS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
