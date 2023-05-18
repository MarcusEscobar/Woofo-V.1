import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

//firebse configs
import firebaseConfig from './config'

//////////////////////////////////////////HOME PAGE/////////////////////////////////////////////////////
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const storageRef = ref(storage);
const auth = getAuth(app);

//formar feed
listAll(storageRef).then((result)=>{
    result.items.forEach((itemRef)=>{
      getDownloadURL(itemRef).then(function(url){
        const image = document.createElement('img');
        const feedDiv = document.getElementById('feed')
        image.src = url;
        feedDiv.appendChild(image);
      });
    });
  }).catch(function(error) {
    console.log(error);
  });
  
  //postar
  const postForm = document.getElementById("post_form");
    postForm.addEventListener('submit', async (event) =>{
      event.preventDefault();
      const file = postForm.image.files[0];
      const fileName = file.name;
      const imageRef = ref(storage, fileName);
      uploadBytes(imageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        location.reload()
      });
      hidePage.style.display="none"
      hideHomePage.style.display="initial"
      
    });