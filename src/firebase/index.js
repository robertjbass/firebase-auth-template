import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  // todo - Add Firebase Config
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
