const express = require('express');
const { initializeApp } = require('firebase/app')
const { getDatabase, set, ref,update,get, child } = require('firebase/database');
const bodyParser = require('body-parser');
const { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } = require('firebase/auth');
const ejs = require('ejs');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname+'/public/'));

const firebaseConfig = {
    apiKey: "AIzaSyA84so8AJpMIOMCApdLGdZQ-vFsu4F9bKY",
    authDomain: "medicine-box-project.firebaseapp.com",
    databaseURL: "https://medicine-box-project-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "medicine-box-project",
    storageBucket: "medicine-box-project.appspot.com",
    messagingSenderId: "225035071578",
    appId: "1:225035071578:web:b5840ab9ff667ffdaea863"
};

const fireStoreApp = initializeApp(firebaseConfig);

const db = getDatabase(fireStoreApp);
const auth = getAuth(fireStoreApp);

// function isLoggedIn(){
    // onAuthStateChanged(auth, function(user) {
    //     if (user) {
    //         return true
    //     } else {
    //         return false
          
    //     }
    //   });
    
// }

app.get('/', (req,res)=>{
    res.render('index');
    res.status(200).send("hello")
});

app.get('/login', (req,res)=>{
    res.render('login')
});

app.get('/register', (req,res)=>{
    res.render('register')
});

app.get('/dashboard/:userID', async (req,res)=>{
    try {
        const dbRef = ref(db);
        const data = await get(child(dbRef, `users/${req.params.userID}`));
        const user_data = data.val()
        console.log(user_data);
        onAuthStateChanged(auth, function(user) {
            if (user) {
                res.render('home', {user_data:user_data});
            } else {
                res.redirect('/');
            }
          });
        
    } catch (err) {
        console.log(err);
        res.status(501).send(err.message);
    }
});

app.get('/logout', (req, res)=>{
    signOut(auth)
    .then(() => {
        res.redirect('/');

    }).catch((error) => {
        res.send(error.message)
      });
})

app.post('/register',(req,res)=>{
    const bodyData = req.body;
    console.log(bodyData);

    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(function(userCredential){

        
        var user = userCredential.user
        
        var user_data = {
            uid : user.uid,
            displayName : req.body.username,
            email : req.body.email,
            username : req.body.username,
            age : req.body.age,
            last_login: Date.now(),
            schedules: {
                first: "",
                second: "",
                third: "",
                fourth: ""
            },
            pulseData: {
                latestPulse : 0,
                pulseHistory : [],
                time : []
            },
            temperatureData: {
                latestTemperature : 0,
                temperatureHistory : [],
                time : []
            }
        
        }
        set(ref(db, 'users/' + user.uid), user_data);
        
        res.redirect(`/dashboard/${user.uid}`);
    })
    .catch(function(error) {

        res.status(501).send(error.message);
    });
});

app.post('/login', (req,res)=>{
    console.log(req.body);
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(async (userCredential) => {
  
      const user = userCredential.user;
  
      var user_data = {
        last_login: Date.now()
    }
    await update(ref(db, 'users/' + user.uid), user_data);
    
    res.redirect(`/dashboard/${user.uid}`);
    res.end();
    })
    .catch((error) => {
        console.error("Error in Login : ", error);
        res.status(501).send(error.message);
    });
});

app.post('/schedule', (req, res) => {
    try {
        
            
        console.log(req.body);
        const userID = req.body.uid
        var post_data = {
            schedules: {
                first: req.body.first,
                second: req.body.second,
                third: req.body.third,
                fourth: req.body.fourth
            }
        }
        update(ref(db, 'users/' + userID), post_data)
        res.redirect(`/dashboard/${userID}`);
        res.end();
        
    } catch {
        res.redirect('/');
    }
    
})

app.get('*', (req,res)=>{
    res.status(404).send('Invalid Request');
});

app.listen(3001, (err)=>{
    if(!err) {
        console.log('Server initiated at port 3001');
    } else {
        console.error('Error in server listening');
    }
})