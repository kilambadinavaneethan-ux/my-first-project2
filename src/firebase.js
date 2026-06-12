// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRYgLcDyTRACUKr9XEPCRnXT7hrsxOYQ8",
  authDomain: "hollow-block-app.firebaseapp.com",
  databaseURL: "https://hollow-block-app-default-rtdb.firebaseio.com",
  projectId: "hollow-block-app",
  storageBucket: "hollow-block-app.firebasestorage.app",
  messagingSenderId: "175461109902",
  appId: "1:175461109902:web:394a555edb70bcdb7db9df",
  measurementId: "G-KBVC7W0BX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

async function signup(email, password, displayName) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName && userCredential.user) {
    await updateProfile(userCredential.user, { displayName });
  }
  return userCredential;
}

async function loginWithGoogle() {
  return await signInWithPopup(auth, googleProvider);
}

async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential;
}

async function logout() {
  return await signOut(auth);
}

export { app, analytics, db, auth, signup, login, loginWithGoogle, logout };