// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCCqHQrUIdVLxmjLkjklxli75WR4k-1qMY",
    authDomain: "sdirsen.firebaseapp.com",
    databaseURL: "https://sdirsen-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sdirsen",
    storageBucket: "sdirsen.appspot.com",
    messagingSenderId: "736992176142",
    appId: "1:736992176142:web:8a7ecf21737149c008b45f",
    measurementId: "G-J76BE588G2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseDatabase = getDatabase(firebaseApp);

export { firebaseApp, firebaseDatabase };