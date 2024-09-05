// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvI6GRIWNp4xD83DlX4SuP44JpdXNdLZ0",
  authDomain: "netflix-gpt-530fd.firebaseapp.com",
  projectId: "netflix-gpt-530fd",
  storageBucket: "netflix-gpt-530fd.appspot.com",
  messagingSenderId: "135731805437",
  appId: "1:135731805437:web:8a27112240a372d23d1294",
  measurementId: "G-FCX60HLN18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);

export const auth = getAuth();
