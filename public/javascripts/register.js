import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

import getData from "../../getUserData.js";
// import fs from 'fs';

    


function register(e) {
    let username = document.getElementById('username').value
    let email = document.getElementById('email').value
    let age = document.getElementById('age').value
    let password = document.getElementById('password').value

    if(validate_email(email)==false){
        alert('Enter valid E-mail')
    }
    if(validate_password(password) == false){
        alert('Min 6 characters required')
    }
    if(validate_username(username) == false){
        alert('Username should only contain letters and numbers')
        return
    }

    if(validate_field(username) == false || validate_field(email) == false || validate_field(age) == false || validate_field(password) == false) {
        alert('One or more extra fields are empty')
        return
    }

}

function validate_email(email) {
    let expression = /^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(email) == true) {
        return true
    } else{
        return false
    }
}

function validate_password(password) {
    if(password < 6){
        return false
    } else {
        return true
    }
}

function validate_username(username) {
    let expression = /^[a-zA-Z0-9]+$/
    if(expression.test(username) == true) {
        return true
    } else {
        return false
    }
}

function validate_field(field) {
    if(field == null){
        return false
    }
    if(field.length <= 0) {
        return false
    } else {
        return true
    }
}

// document.getElementById('b').addEventListener('click', register)