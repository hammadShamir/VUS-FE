import Cookies from "js-cookie";
import { FirebaseError } from "firebase/app";
export const isAuthenticated = () => {
  return Cookies.get("token") || null;
};

export const logout = () => {
  const allCookies = Cookies.get();
  for (const cookieName in allCookies) {
    Cookies.remove(cookieName, { path: "/" });
  }
  window.location.href = "/";
};


export const getFirebaseErrorMessage = (errorCode: FirebaseError): string => {
  console.log(errorCode.code);
  switch (errorCode.code) {
    case "auth/user-not-found":
      return "No user found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/invalid-email":
      return "Invalid email format.";
    case "auth/invalid-credential":
      return "Invalid Email or Password.";
    case "auth/user-disabled":
      return "This User Account Has Been Disabled. Please Contact Support.";
    case "auth/email-already-in-use":
      return "User Already Registered.";
    case "auth/weak-password":
      return "The password is too weak.";
    default:
      return "An unknown error occurred. Please try again.";
  }
};

export const getUser = () => {
  const user = Cookies.get("user");
  if (user) {
      try {
          return JSON.parse(user);
      } catch (error) {
          console.error("Error parsing user cookie:", error);
          return {};
      }
  }
  return {}; 
};

export const getToken = () => {
    return Cookies.get('token')
}
