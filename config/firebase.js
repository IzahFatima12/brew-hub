// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSQG2Ge8IF2QBJzKcRYEd2uA8cRCMKwxQ",
  authDomain: "brewhub-a1f6d.firebaseapp.com",
  projectId: "brewhub-a1f6d",
  storageBucket: "brewhub-a1f6d.appspot.com",
  messagingSenderId: "58128023361",
  appId: "1:58128023361:web:1f59b010c7db94d4aa6bc0",
  measurementId: "G-XQKT7TYEY1",
  databaseURL: " https://brewhub-a1f6d-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

//const analytics = getAnalytics(app);
export { app, database };
