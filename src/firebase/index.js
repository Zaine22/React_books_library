import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqOJaDEgbPAYi6G38sjIbF-Mtwenr_8Dk",
  authDomain: "library-app-50695.firebaseapp.com",
  projectId: "library-app-50695",
  storageBucket: "library-app-50695.appspot.com",
  messagingSenderId: "172825508779",
  appId: "1:172825508779:web:df48c6a6732cd4afbf70ee",
  measurementId: "G-175BWY98DB"
};

const app = initializeApp(firebaseConfig);

let db  = getFirestore(app);

export {db}