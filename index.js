var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');
const admin   = require('./admin');
const firebase = require('firebase');
app.use(express.static('public'));
app.use(cors());

const firebaseConfig = {
    apiKey: "AIzaSyBABX_sKI35BiJ-rTQMRwnsgI3iOg-gtWk",
    authDomain: "courso-bf828.firebaseapp.com",
    databaseURL: "https://courso-bf828-default-rtdb.firebaseio.com",
    projectId: "courso-bf828",
    storageBucket: "courso-bf828.appspot.com",
    messagingSenderId: "769126759906",
    appId: "1:769126759906:web:d73353f0d05ba715368dbb"
};

firebase.initializeApp(firebaseConfig);

async function authorizeTest(email, password) {
    const auth  = firebase.auth();
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        return '';
      } 
      catch (e) {
        console.log(e);
        return e.message;
      }
}

async function createMongoUser(errorMsg, name, email, password) {
    if( errorMsg === ''){
        await dal.create(name, email, password).
                then((user) => {
                    console.log('dal ' + user);
                    return user;
                })
    }
}

//create
app.get('/account/create/:name/:email/:password', async function (req, res) {
    const auth  = firebase.auth();      
    let errorMesg = await authorizeTest(req.params.email, req.params.password);
    let user = await createMongoUser(errorMesg, req.params.name, req.params.email, req.params.password)
    if (errorMesg === '') {
        res.send({"email": req.params.email, "error": ''});
    }else {
        res.send({"email": req.params.email, "error":errorMesg});
    }
});

//get all data
app.get('/account/all/:email/:password', function(req,res) {
    dal.all(req.params.email, req.params.password).
        then((docs) => {
            console.log(docs);
            res.send(docs);
        })
})

app.get('/account/login/:email/:password', function (req, res) {
    console.log('hello ' + req.params.email, req.params.password);
   try {
    x(req.params.email, req.params.password);
    async function x(email, password) {
        const auth  = firebase.auth();
        const data = await auth.signInWithEmailAndPassword(email, password)
        const token = await auth.currentUser.getIdToken()
        console.log('token ' + JSON.stringify(token));
        dal.balance(req.params.email, req.params.password).
                    then((docs) => {
                        console.log(docs);
                        res.send({"name": docs, "token": token, "error": '',"balance": docs});
                    })
        return token
    }
   } catch(e) {
    res.send({"name": '', "token": '', "error": e,"balance": 0});
   }
})

//make transaction
app.get('/account/transaction/:email/:password/:amount/', function (req, res) {
    /* const idToken = req.headers.authorization
    console.log('route toke ' + idToken);
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken); */
            
    dal.transaction(req.params.email, req.params.password, req.params.amount).
        then((docs) => {
            console.log(docs);
            res.send(docs);
        })
        .catch(function(error) {
            console.log('error:', error);
            res.send(error);
        });
});

app.get('/account/logout', function (req, res) {
    console.log('logout route');
    const auth  = firebase.auth();
    auth.signOut()
        .then(function() {
            // Sign-out successful.
            console.log('good logout');
            res.send({"error": ''});
        })
        .catch(function(error) {
            console.log('bad logout');
            // An error happened
            res.send({"error": error});
        });
    
});



var port = 3000;
app.listen(port);
console.log(`Running on port ${port}`);