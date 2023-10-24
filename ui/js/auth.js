"use strict";
import { signInWithEmail, registerWithEmail } from "../../database/firebase.js";

const loginForm = document.querySelector("#loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    signInWithEmail(email, password);
  });
}

const registerForm = document.querySelector("#registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const passwordConfirm = document.querySelector("#passwordConfirm").value;

    if (password === passwordConfirm) {
      registerWithEmail(email, password, username);
    } else {
      alert("passwords does not match");
      return;
    }
  });
}
