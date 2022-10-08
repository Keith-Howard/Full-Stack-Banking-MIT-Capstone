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

getAuth()
  .createUser({
    email: 'user@example.com',
    emailVerified: false,
    phoneNumber: '+11234567890',
    password: 'secretPassword',
    displayName: 'John Doe',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false,
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
  });

  getAuth();