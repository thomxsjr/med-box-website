const express = require('express');
const favicon = require('serve-favicon')
const { initializeApp } = require('firebase/app')
const { getDatabase, set, ref,update,get, child } = require('firebase/database');
const bodyParser = require('body-parser');
const { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } = require('firebase/auth');
const ejs = require('ejs');
const axios = require('axios');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public/'));
app.use(favicon(__dirname+'/public/images/favicon.png'));

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



app.get('/data/:userID', async (req,res)=>{
    try {
        const dbRef = ref(db);
        const data = await get(child(dbRef, `users/${req.params.userID}`));
        const user_data = data.val()
        res.status(200).json({user_data : user_data});
    } catch(err) {
        res.status(500).json({res:false});
    }
});


app.get('/dashboard/:userID', async (req,res)=>{
    try {
        const dbRef = ref(db);
        const data = await get(child(dbRef, `users/${req.params.userID}`));
        const user_data = data.val()
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


app.post('/register',(req,res)=>{
    const bodyData = req.body;
    console.log(bodyData);

    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(function(userCredential){
        
        var user = userCredential.user
        
        var user_data = {
            uid : user.uid,
            udcode : req.body.udcode,
            displayName : req.body.username,
            email : req.body.email,
            username : req.body.username,
            gender : req.body.gender,
            age : req.body.age,
            last_login: Date.now(),
            schedules: {
                first: "",
                second: "",
                third: "",
                fourth: ""
            },
            pulseData: {
                startIndex : -12,
                latestPulse : 0,
                pulseHistory : '',
                time : ''
            },
            temperatureData: {
                startIndex : -12,
                latestTemperature : 0,
                temperatureHistory : '',
                time : ''
            },
            heartAttackPrediction : ""
        
        };
        var device_data = {
            uid : user.uid
        };

        set(ref(db, 'users/' + user.uid), user_data);
        set(ref(db, 'devices/' + req.body.udcode), device_data);
        
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

app.get('/logout', (req, res)=>{
    signOut(auth)
    .then(() => {
        res.redirect('/');

    }).catch((error) => {
        res.send(error.message)
      });
})

app.post('/schedule', (req, res) => {
    try {
        
        const userID = req.body.uid
        console.log(userID);
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

app.post('/prediction', (req, res) => {

    
    const userID = req.body.uid;
    const age = Number(req.body.age);
    const gender = Number(req.body.gender);
    const pulse_history = JSON.parse(req.body.pulseHistory);
    const pulse_length = pulse_history.length;
    let pulse_sum = 0;
    for (let i = 0; i < pulse_length; i++ ) {
        pulse_sum += pulse_history[i];
    }
    let pulse_average = Math.round(pulse_sum/pulse_length);

    axios.get(`https://smart-med-box-ml.onrender.com/${gender}/${age}/${pulse_average}`)
    .then(response => {
        console.log(response.data.result);
        if(response.data.result == 0) {
            var post_data = {
                heartAttackPrediction : "Low Risk"
            }
            update(ref(db, 'users/' + userID), post_data)

        }
        else if(response.data.result == 1) {
            var post_data = {
                heartAttackPrediction : "High Risk"
            }
            update(ref(db, 'users/' + userID), post_data)

        }
        else {
            console.log('Failed')
        }
        

        res.redirect(`/dashboard/${userID}#prediction`);
        res.end();
    })
    .catch(error => {
        
        res.redirect(`/`);
        console.log(error);
    });
    
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