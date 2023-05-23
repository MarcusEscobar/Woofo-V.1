//Firebase imports
//modulos importados da mesma forma que foi feito no arquivo 'homeApp.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword ,GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
//firebse configs
import {firebaseConfig} from './config.js'

const app = initializeApp(firebaseConfig);//Inicialização do aplicativo
const analytics = getAnalytics(app);
const auth = getAuth(app);//Auth: modulo utlizado para fazer login e cadastro
const provider = new GoogleAuthProvider();//Configuração do um novo proverdor, necessario para login com Google
const db = getFirestore(app); //Firestore
const refDB = collection(db,'ref'); 


//Criação de usuário:
//Essa parte do código é responsável por receber o formulario de cadastro e 
//utilizar as informações obtidas para criar um novo usuário atravez da função : 'createUserWithEmailAndPassword' do Firebase Auth.
const signUpForm = document.getElementById('signup_form');//recebe o id do 'signup_form'
  signUpForm.addEventListener('submit', (event) => {//Adiciona um evento após o submit
    event.preventDefault();//Cancela em caso de erro no formulário

    const email = signUpForm.emailcadastro.value; //Associação do email inserido no formularia à variável 'email'
    const password = signUpForm.passwordcadastro.value; //Associação da senha inserida no formularia à variável 'password'

    createUserWithEmailAndPassword(auth, email, password) //Função que cria novos usuários => Retorna um promise
      .then((userCredential) => { // coleta a informação gerada pela função acima
        const user = userCredential.user; 
        console.log('Usuário criado:', user); //printa as informações do usuário (não ficará na versão final)
        alert('Usuário criado com sucesso')//mensagem de sucesso
        document.querySelector('.login-section').classList.add('active'); //Revela o formulário de Login
        document.querySelector('.cadastro-section').classList.remove('active'); //Esconde o de cadastro 
      })                                                                    
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage); //Printa o erro no console em caso de falha 
        alert('Erro! Tente novamente.')
      });
  });

//Login:
//Semelhante à cração de usuário, essa parte do código recebe o dados do formulário preenchido e
// utiliza da função 'signInWithEmailAndPassword' para fazer o login
//caso o a conta não tenha sido criada o login não funcionará
const loginForm = document.getElementById('login_form');//Recebe o ID do 'login_form'
  loginForm.addEventListener('submit', (event) =>{//Adiciona um evento
    event.preventDefault();//Cancela em caso de falha no formulário

    const emailLogin = loginForm.emaillogin.value; //Associa o email inserido no formulário à variável 'emailLogin'
    const passwordLogin = loginForm.passwordlogin.value; //Associa a senha inserida no formulário à variável 'passwordLogin'

    signInWithEmailAndPassword(auth, emailLogin, passwordLogin) //Funcção que realiza o login
      .then((userCredential) => { //recebe os dados após o fim da promise 
        const user = userCredential.user;
        console.log('Usuário Logado:', user);//Printa as informações do usuário no console
        alert('Usuário logado com sucesso')//mensagem de sucesso
        window.location.href = "home.html";//redirecionamento para a Home Page
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);//Printa mensagem de erro em caso de falha
        alert('Erro! Tente novamente.')
      });
  });

//Login com Google
//Essa parte do código é responsável por fazer o login utilizando uma conta do google já existente
  const loginGoogleButton =  document.getElementById("login-google"); //Recebe o id o botão 'login-google'
  loginGoogleButton.addEventListener('click', function(){ //Adiciona um evento de click nesse botão
    signInWithPopup(auth, provider).then((result) =>{ //Função responsável pelo login
      const credential = GoogleAuthProvider.credentialFromResult(result);//Acossia o retorno da função à variável 'credential'
      const token = credential.accessToken;//Armazena o token de usuário (não estará na versão final)
      const user = result.user; //Armazena informações do usuário como: nome, email, foto, etc  (não estará na versão final)
      const userName = user.displayName
      const userEmail = user.email
      const UserRef = collection(db,'Usuários')
      setDoc(doc(UserRef,userName+'-'+userEmail),{//Envio das informações do usuáriio para o Firestore
        nome: user.displayName, 
        email:user.email,
        foto: user.photoURL,
        PhoneNumber: user.phoneNumber,
      });
      console.log('Esse é o token:',token); // Print do token no console
      console.log('Esse é o User:', user); // printo das informações do usuário no console
      window.location.href = "home.html";
     
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
  })