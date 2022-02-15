import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDRqd2N9bUqV20hCbS_6Repor-IQ-FQSXM',
  authDomain: 'zelly-d6169.firebaseapp.com',
  databaseURL: 'https://zelly-d6169-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'zelly-d6169',
  storageBucket: 'zelly-d6169.appspot.com',
  messagingSenderId: '579771725791',
  appId: '1:579771725791:web:0827473b5d90d60358766a',
  measurementId: 'G-8E6EH64PS2',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
