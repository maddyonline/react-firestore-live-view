import React from 'react'

import { FirestoreLiveView } from 'react-firestore-live-view'
import 'react-firestore-live-view/dist/index.css'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1efZh09ZowCO9G6JhTgiqgw7snDAqCNo",
  authDomain: "react-firebase-course-4eaf5.firebaseapp.com",
  projectId: "react-firebase-course-4eaf5",
  storageBucket: "react-firebase-course-4eaf5.appspot.com",
  messagingSenderId: "429600048668",
  appId: "1:429600048668:web:c5035dde77bd957175c1d9",
  measurementId: "G-SQ9VRKDSLX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  return <FirestoreLiveView collectionName={"cities"} db={db} />
}

export default App
