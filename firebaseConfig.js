import firebase from 'firebase/compat/app'; // Use 'firebase/compat/app'
import 'firebase/compat/firestore'; // For Firestore

const firebaseConfig = {
  apiKey: 'AIzaSyD-GdZ2NAGJUdGw_EWv-B9hwFZhJW6XGlY',
  authDomain: 'rn-usermanagegment.firebaseapp.com',
  projectId: 'rn-usermanagegment',
  storageBucket: 'rn-usermanagegment.appspot.com',
  messagingSenderId: '368643138656',
  appId: '1:368643138656:web:d0545e812b37048f630f05',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
export default firestore;
