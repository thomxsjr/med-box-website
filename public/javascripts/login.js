import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, update, ref } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
 




const auth = getAuth()
const database = getDatabase(app)


function login(e) {

  const email =  document.getElementById('email').value
  const password = document.getElementById('password').value

 


}



document.getElementById('button').addEventListener('click', login)