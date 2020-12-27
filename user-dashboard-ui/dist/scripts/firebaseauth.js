  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDXI45kIAO9rHutteEm-bhUg3ylaRJaMpM",
    authDomain: "anoopcameras.firebaseapp.com",
    projectId: "anoopcameras",
    storageBucket: "anoopcameras.appspot.com",
    messagingSenderId: "827696625581",
    appId: "1:827696625581:web:078a831b969772ded71324",
    measurementId: "G-4HWVVGL6ZK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const auth=firebase.auth();
  const db=firebase.firestore();
  const storage = firebase.storage();
  db.settings({timestampsInSnapshoots:true})