import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBEGw9uqTe4YJvJvopEzF9gVzsZ688uOQU",
    authDomain: "vus-v1-ce0e9.firebaseapp.com",
    projectId: "vus-v1-ce0e9",
    storageBucket: "vus-v1-ce0e9.firebasestorage.app",
    messagingSenderId: "748320912941",
    appId: "1:748320912941:web:8a71aafc5232daa742aaa4",
    measurementId: "G-7RHP3VVFXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig );

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()