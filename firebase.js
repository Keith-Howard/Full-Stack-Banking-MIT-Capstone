
const firebaseConfig = {
    apiKey: "AIzaSyBABX_sKI35BiJ-rTQMRwnsgI3iOg-gtWk",
    authDomain: "courso-bf828.firebaseapp.com",
    databaseURL: "https://courso-bf828-default-rtdb.firebaseio.com",
    projectId: "courso-bf828",
    storageBucket: "courso-bf828.appspot.com",
    messagingSenderId: "769126759906",
    appId: "1:769126759906:web:d73353f0d05ba715368dbb"
};

firebase.initialize(firebaseConfig);

function createAccount(name, email, password) {
    const auth  = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email,password);
	promise.catch(e => console.log(e.message));
}
