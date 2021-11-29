import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDshBapQZ5DW_JkwFXHJbCPlMdgmEDgxHA",
    authDomain: "photo-gallery-2430b.firebaseapp.com",
    projectId: "photo-gallery-2430b",
    storageBucket: "photo-gallery-2430b.appspot.com",
    messagingSenderId: "740294464966",
    appId: "1:740294464966:web:095bccd3a96faf2330cec7",
    measurementId: "G-21E84Y68EW"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  export { storage }