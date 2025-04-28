// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDdq3dIi_yM5Gwzq7jkmvjO1eQzSEQ6ff4',
  authDomain: 'fetch-todos-test.firebaseapp.com',
  projectId: 'fetch-todos-test',
  storageBucket: 'fetch-todos-test.firebasestorage.app',
  messagingSenderId: '897239668793',
  appId: '1:897239668793:web:2570db1cf3d8c3554555e8',
  measurementId: 'G-6XVEPGTNN5',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const analytics = getAnalytics(app)
