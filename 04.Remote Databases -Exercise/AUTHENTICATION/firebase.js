  //Set up SDK:
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCC4BaXQOAa0WO0IsuHAw6GM97RTGRewJw",
    authDomain: "books-56012.firebaseapp.com",
    databaseURL: "https://books-56012.firebaseio.com",
    projectId: "books-56012",
    storageBucket: "books-56012.appspot.com",
    messagingSenderId: "372316895562",
    appId: "1:372316895562:web:144a90368f9372bb64e9b3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  console.log(firebase.auth());
  