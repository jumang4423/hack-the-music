import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const app = initializeApp({
  apiKey: "AIzaSyCF-yn31g2M-UU8wbYxquWVc8j8u4rDrss",
  authDomain: "msn-project-ef6c2.firebaseapp.com",
  projectId: "msn-project-ef6c2",
  storageBucket: "msn-project-ef6c2.appspot.com",
  messagingSenderId: "607117372758",
  appId: "1:607117372758:web:87e8fa566fb8765ec87af7",
  measurementId: "G-BCKC3S5DQF",
});

const storage = getStorage(app);
export default storage;
