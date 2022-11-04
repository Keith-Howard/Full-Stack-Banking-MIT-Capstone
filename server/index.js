var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal');
const admin   = require('./admin');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const firebase = require('firebase');
const path = require('path');

app.use(express.static(path.join(__dirname + '/public')));
app.use(cors());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Bank API',
            version: '1.0.0'
        }
    },
    apis: ['index.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

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

async function createFirebaseCredentials(email, password) {
    console.log('createFirebaseCredentials');
    const auth  = firebase.auth();
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        return '';
      } 
      catch (e) {
        console.log('createFirebaseCredentials error ' + e.message);
        return e.message;
      }
}

async function createMongoUser(name, email, password) {
    try {
        await dal.create(name, email, password).
            then((user) => {
                console.log('createMongoUser success ' + JSON.stringify(user));
            });
            return '';
    }
    catch (e) {
        console.log('createMongoUser error ' + e.message);
        return e.message;
      }
}

/**
 * @swagger
 * paths:
 *   /account/create/{name}/{email}/{password}:
 *    get:
 *      summary: Create new user
 *      parameters:
 *        - name: name
 *          in: path
 *          required: true
 *          description: user name
 *          schema:
 *            type: string
 *        - name: email
 *          in: path
 *          required: true
 *          description: user email address
 *          schema:
 *            type: string
 *        - name: password
 *          in: path
 *          required: true
 *          description: user password
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Success
 */

//create user
app.get('/account/create/:name/:email/:password', async function (req, res) {      
    let errorMsg = await createFirebaseCredentials(req.params.email, req.params.password);
    if (errorMsg === '') {
        errorMsg = await createMongoUser(req.params.name, req.params.email, req.params.password);
    };
    if (errorMsg === '') {
        console.log('create user success');
        res.send({"email": req.params.email, "error": ''});
    }else {
        console.log('create user error ' + JSON.stringify({"email": req.params.email, "error":errorMsg}));
        res.send({"email": req.params.email, "error":errorMsg});
    }
});

/**
 * @swagger
 * paths:
 *   /account/alltransactions/{email}:
 *    get:
 *      summary: User transaction history
 *      parameters:
 *        - name: email
 *          in: path
 *          required: true
 *          description: user email address
 *          schema:
 *            type: string
 *        - name: Authorization
 *          in: header
 *          required: true
 *          description: 'user token'
 *          schema:
 *            type: string
 *        - name: content-type
 *          in: header
 *          required: true
 *          description: ''
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Success
 */

app.get('/account/alltransactions/:email', function(req, res) {
    try {
        const idToken = req.headers.authorization;
        console.log('allTransactions route token ' + idToken);
        admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('allTransactions decodedToken:',decodedToken);
        })
        dal.getAllTransactions(req.params.email).
        then((docs) => {
            console.log('allTransactions success ' + docs);
            res.send(docs);
        })
    }
    catch (e) {
        console.log('allTransactions error ' + e);
        res.send(e.message);
    }
})

/**
 * @swagger
 * paths:
 *   /account/all/{email}/{password}:
 *    get:
 *      summary: All data for user
 *      parameters:
 *        - name: email
 *          in: path
 *          required: true
 *          description: user email address
 *          schema:
 *            type: string
 *        - name: password
 *          in: path
 *          required: true
 *          description: user password
 *          schema:
 *            type: string
 *        - name: Authorization
 *          in: header
 *          required: true
 *          description: 'user token'
 *          schema:
 *            type: string
 *        - name: content-type
 *          in: header
 *          required: true
 *          description: ''
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Success
 */

//get all data
app.get('/account/all/:email/:password', function(req,res) {
    try {
        const idToken = req.headers.authorization;
        console.log('allData route token ' + idToken);
        admin.auth().verifyIdToken(idToken)
        dal.all(req.params.email, req.params.password).
        then((docs) => {
            console.log('allData success ' + docs);
            res.send(docs);
        })
    }
    catch (e) {
        console.log('allData error ' + e);
        res.send(e.message);
      }
})

/**
 * @swagger
 * paths:
 *   /account/login/{email}/{password}:
 *    get:
 *      summary: Login user
 *      parameters:
 *        - name: email
 *          in: path
 *          required: true
 *          description: user email address
 *          schema:
 *            type: string
 *        - name: password
 *          in: path
 *          required: true
 *          description: user password
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Success
 */

app.get('/account/login/:email/:password', function (req, res) {
   try {
    executeLogin(req.params.email, req.params.password);
    async function executeLogin(email, password) {
        const auth  = firebase.auth();
        await auth.signInWithEmailAndPassword(email, password)
            .then((response) => {
                response.user.getIdToken().then(token => {
                    dal.balance(req.params.email, req.params.password).
                        then((docs) => {
                            console.log('server login API success ' + docs);
                            res.send({"token": token, "error": '',"balance": docs});
                        })
                })
            })
            .catch((e) => {
                console.log('server login error ' + e);
                res.send({"token": '', "error": e.message,"balance": ''});
            })
    }
   } catch(e) {
    res.send({"token": '', "error": e,"balance": 0});
   }
})

/**
 * @swagger
 * paths:
 *   /account/transaction/{email}/{amount}/{transType}/{date}/{balance}:
 *    get:
 *      summary: Make user transaction
 *      parameters:
 *        - name: email
 *          in: path
 *          required: true
 *          description: user email address
 *          schema:
 *            type: string
 *        - name: amount
 *          in: path
 *          required: true
 *          description: transaction amount
 *          schema:
 *            type: string
 *        - name: transType
 *          in: path
 *          required: true
 *          description: transaction type
 *          schema:
 *            type: string
 *        - name: date
 *          in: path
 *          required: true
 *          description: date of transaction
 *          schema:
 *            type: string
 *        - name: balance
 *          in: path
 *          required: true
 *          description: updated balance
 *          schema:
 *            type: string
 *        - name: Authorization
 *          in: header
 *          required: true
 *          description: 'user token'
 *          schema:
 *            type: string
 *        - name: content-type
 *          in: header
 *          required: true
 *          description: ''
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Success
 */

//make transaction
app.get('/account/transaction/:email/:amount/:transType/:date/:balance', function (req, res) {
    const idToken = req.headers.authorization;
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('transaction decodedToken:',decodedToken);
        })
        
        dal.transaction(req.params.email, String(req.params.balance))
        .then((result) => {
            if (result.modifiedCount === 1) {
                console.log('transaction success ' + result);
                res.send({"status": "success"});
            } else {
                res.send({"status": "failed"});
            }
            dal.enterTransToDb(req.params.email, req.params.date, req.params.transType, String(req.params.amount))
            .then((result) => {
                if (result.modifiedCount === 1) {
                    console.log('enterTransToDB success ' + result);
                    res.send({"status": "success"});
                } else {
                    res.send({"status": "failed"});
                }
            })
            .catch((error) => {
                console.log('enterTransToDB error ' + error);
                res.send({"status": error});
            });
        })
    .catch((error) => {
        console.log('transaction error in server ' + error);
        res.send({"status": error});
    });
});

/**
 * @swagger
 * paths:
 *   /account/logout:
 *    get:
 *      summary: Logout user
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          required: true
 *          description: 'user token'
 *          schema:
 *            type: string
 *        - name: content-type
 *          in: header
 *          required: true
 *          description: ''
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Success
 */
app.get('/account/logout', function (req, res) {
    console.log('logout route');
    const idToken = req.headers.authorization;
    console.log('logout route token ' + idToken);
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('logout decodedToken: ',decodedToken);
        })
        const auth  = firebase.auth();
        auth.signOut()
            .then(function() {
                // Sign-out successful.
                console.log('logout success');
                res.send({"error": ''});
            })
            .catch(function(error) {
                console.log('logout error ' + error);
                // An error happened
                res.send({"error": error});
            })
    .catch((error) => {
        console.log('logout error in server ' + error);
        res.send({"status": error});
    });
        
});

// when process.env.PORT is set by cloud provider that is the port for listening
const port = process.env.PORT || 3000

app.listen(port);
console.log(`Running on port ${port}`);