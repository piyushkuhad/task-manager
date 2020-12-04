import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createFirestoreInstance } from 'redux-firestore';
import { firebaseConfig } from './utils/firebaseConfig';

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const rrfConfig = {
  userProfile: 'users', //name of the collection
  useFirestoreForProfile: true, //we want to use Cloud Firestore to store the users’ data
};

export const rrfPropsHalf = {
  firebase,
  config: rrfConfig,
  createFirestoreInstance, //since we are using Firestore
};
