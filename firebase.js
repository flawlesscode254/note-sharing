import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCXq3HftU_0ppN1rTJXk317Xjjt9Jy4Lz0",
    authDomain: "music-13fae.firebaseapp.com",
    projectId: "music-13fae",
    storageBucket: "music-13fae.appspot.com",
    messagingSenderId: "904366094629",
    appId: "1:904366094629:web:2081122fec3ce2e04c42cc",
    measurementId: "G-2P25XDW2KH"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = firebase.firestore()
const auth = firebase.auth()
const store = firebase.storage()

export default db
export { store, auth }