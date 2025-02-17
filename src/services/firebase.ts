import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfigString = process.env.NEXT_PUBLIC_FIREBASE;
if (!firebaseConfigString) {
  throw new Error("Firebase config is missing from the environment variables.");
}

// Decode the base64 string and parse it to a JSON object
const firebaseConfig = JSON.parse(Buffer.from(firebaseConfigString, "base64").toString("utf-8"));

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()