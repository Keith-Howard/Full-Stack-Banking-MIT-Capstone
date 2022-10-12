const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log('Connected successfully to db server');

    db = client.db('myproject');
});

function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}

function all(email, password) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({"email": email, "password": password})
            .project({"_id": 0})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

function balance(email, password) {
    console.log('input ' + email, password);
    return new Promise((resolve, reject) => {
        const collection = db
            .collection('users')
            .find({"email": email, "password": password})
            .project({"balance": 1, "name": 1, '_id': 0})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
        
    })
}


async function transaction(email, password, amount) {
    const collection = db
     await db.collection('users').updateOne(
        { 'email': email, 'password': password},
        {
          $set: {'balance': amount},
          $currentDate: { lastModified: true }
        }
      );
}

module.exports = {create, all, balance, transaction};