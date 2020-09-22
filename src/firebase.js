import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB4rdm30IkOW1zN2tkewkUkwJBTpVm1ZH0",
    authDomain: "todo-app-2f167.firebaseapp.com",
    databaseURL: "https://todo-app-2f167.firebaseio.com",
    projectId: "todo-app-2f167",
    storageBucket: "todo-app-2f167.appspot.com",
    messagingSenderId: "824038069019",
    appId: "1:824038069019:web:99fee4d8d3e9217634f9be"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;