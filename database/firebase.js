"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKMUuylOgIl229sBUyrLCvHuyVLGLLEyk",
  authDomain: "heat-or-not.firebaseapp.com",
  projectId: "heat-or-not",
  storageBucket: "heat-or-not.appspot.com",
  messagingSenderId: "1049306023736",
  appId: "1:1049306023736:web:f632cb666c68406b9163cd",
  measurementId: "G-HLTBK8WCHK",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestoreDB = getFirestore(app);
let userID;

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged in!");
  } else {
    console.log("No user found");
  }
});

const signInWithEmail = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("userCredential:", userCredentials.user);
    alert("logged in");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Error: " + errorMessage + "code: " + errorCode);
  }
};

const registerWithEmail = async (email, password, username) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Logged in -userCredential:", userCredentials.user);

    const docRef = await addDoc(collection(firestoreDB, "users"), {
      email: email,
      lastviewed: 1,
      password: password,
      username: username,
    });
    console.log("doc created with id: " + docRef.id);
    userID = docRef.id;

    alert("User created");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Error: " + errorMessage + "code: " + errorCode);
  }
};

export { app, auth, firestoreDB, signInWithEmail, registerWithEmail, userID };
