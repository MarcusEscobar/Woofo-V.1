//Imports:
//Aqui importamos os modulos do firebase, cada função a ser utilizada está dentro das chaves
//O Link de onde vem essas funções é um modulo Online do firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

//Firebase Config:
//Aqui importamos as configurações do nosso app Firebase de outro arquivo, config.js,
//isso é uma medida de segurança para não expor nossas configurações de forma públina no GitHub
import {firebaseConfig} from './config.js'

//Inicialização do aplicativo e modulos
const app = initializeApp(firebaseConfig); 
const analytics = getAnalytics(app);//Analytics: gera relatorios do uso do app no site do Firebase (Não é usado diretamento no código)

const storage = getStorage(app); //Storage: Banco de dados para as fotos do feed.
const storageRef = ref(storage); //Referencia do Storage

const db = getFirestore(app); //Firestore: Banco de dados que armazena textos, como informações de usuários, comentários etc. 
const refDB = collection(db,'ref'); //Referencia do Firestore

//formar feed:
//Essa parte do código le o Storage usando a referencia criada acima e lista todos os itens,
//depois adiciona as fotos listadas na Div do feed.
//O processo de adicionar as fotos no feed é feito utilizando a funçã .appendChild(),
//alem disso outros elementos HTML são criados, como uma div para o nome do usuário e um para o campo de comentários
const listaUrl = await getDocs(collection(db,'URLs'));
const arrayDocs = listaUrl.docs
arrayDocs.reverse();
arrayDocs.forEach((doc) =>{
  const url = doc.data().URL
  const nome = document.createElement('p'); //Ciar parágrafo para o nome de usuário
  nome.innerText = "Nome de usuário aqui";  //Inserir texto no parágrafo criado acima
  const UsarNameDiv = document.createElement('div'); //Criar div para o parágrafo
  UsarNameDiv.classList.add('UsarNameDiv'); //Adicionar uma classe a div criada acima. Essa classe é utilizada no css
  UsarNameDiv.append(nome);//Adicionar o parágrafo com o nome na div 'UserNameDiv'

  const image = document.createElement('img'); //Criar um elemento de imagem (é efetivamento aqui que o feed é feito)
  image.src = url; //Inserir as Urls no elemento de imagem.

  const CommentDiv = document.createElement('div'); //Criar Div para o campo de comentários
  CommentDiv.classList.add('CommentDiv'); //Adicionar uma classe
  const TextComment = document.createElement('textarea'); //Área de texto que exemplifica os comentários
  CommentDiv.appendChild(TextComment)//Adicionar o exemplo dos comentários na Div criada acima

  const PostDiv = document.createElement('div');//Criação da div principal, todas os outros elementos ficaram dentro dessa Div.
  PostDiv.classList.add('PostDiv');//Adicionar classe

  PostDiv.appendChild(UsarNameDiv)//Append da Div de nome de usuário
  PostDiv.appendChild(image); //Append da Div da imagem postada
  PostDiv.appendChild(CommentDiv); //Append da Div de comentários

  const feedDiv = document.getElementById('feed');//Pega o id da Div 'feed' criada no arquivo 'home.html'
  feedDiv.appendChild(PostDiv);//Adiciona todos os elementos criados na div 'feed'.
  
})


//Upload de imagens para o banco de dados:
const postForm = document.getElementById("post_form");//Revcebe o ID do formulário 'post_form' criado no arquivo 'home.html'
postForm.addEventListener('submit', async (event) =>{ //Adiciona um evento que acontece quando o submit for acionado
  event.preventDefault(); //Cancela o evento caso tenha algum erro no formulário
  
  const file = postForm.image.files[0]; //Recebe a imagem do formulário e associa a variável 'file'
  const fileName = file.name; //recebe o nome da imagem

  const fileRef = ref(storage, fileName);//Cria uma referencia do Storage
  uploadBytes(fileRef, file).then((snapshot) => { //Upload a imagem => Retorna uma promise
    getDownloadURL(ref(storage,fileName)).then(function(url){//Recebe a Url para armazenar no Firestore
    const timestamp = new Date(); //Recebe o horário de postagem
    console.log(timestamp)
    const time = snapshot.metadata.updated
    
    setDoc(doc(db,'photos',fileName+timestamp),{ //Evia as informações, nome e horário, para um documento no Firestore                                          
      fileName: fileName,                 //(Armazenamento de metadados)
      timestamp: timestamp,
      URL: url, //URL também está sendo enviada para o Firestore
    });
    const docRef = collection(db,'URLs')    
    setDoc(doc(docRef,time),{URL:url,});//Envia a url para uma coleção separada 
  });
  console.log('Foto enviada');
  alert('Arquivo Enviado');
  }).catch(function(error) {
    console.log(error);//Printa o erro no console em caso de falha
  });
  })
