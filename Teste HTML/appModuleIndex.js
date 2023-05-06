//Firebase imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

//firebse configs
const firebaseConfig = {
  apiKey: "AIzaSyDzRbVbrB7ZjJw-HylA5HM9DZ8Taf0eiiI",
  authDomain: "woof0-75c1f.firebaseapp.com",
  projectId: "woof0-75c1f",
  storageBucket: "woof0-75c1f.appspot.com",
  messagingSenderId: "10079225691",
  appId: "1:10079225691:web:a8c0e222346ef945a4bc7e",
  measurementId: "G-4R28M6JFQ4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

////////////////////////////////////SIGNUP E LOGIN PAGE/////////////////////////////////////////
//Create User
const signUpForm = document.getElementById('signup_form');
  signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = signUpForm.emailcadastro.value;
    const password = signUpForm.passwordcadastro.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário criado:', user);
        alert('Usuário criado com sucesso')
        document.querySelector('.login-section').classList.add('active');
        document.querySelector('.cadastro-section').classList.remove('active');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        alert('Erro! Tente novamente.')
      });
  });

//Login
const loginForm = document.getElementById('login_form');
  loginForm.addEventListener('submit', (event) =>{
    event.preventDefault();

    const emailLogin = loginForm.emaillogin.value;
    const passwordLogin = loginForm.passwordlogin.value;

    signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
      .then((userCredential) => {          
        const user = userCredential.user;
        console.log('Usuário Logado:', user);
        alert('Usuário logado com sucesso')
        window.location.href = "home.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        alert('Erro! Tente novamente.')
      });
  });