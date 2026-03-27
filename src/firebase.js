import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBi4eSBRzKR-6PK5BGNief9HkFxZN8AP7I",
  authDomain: "aquasense-a9b7e.firebaseapp.com",
  databaseURL: "https://aquasense-a9b7e-default-rtdb.firebaseio.com",
  projectId: "aquasense-a9b7e",
  storageBucket: "aquasense-a9b7e.firebasestorage.app",
  messagingSenderId: "411466855832",
  appId: "1:411466855832:web:ebd948d6000738aa8a67ed",
  measurementId: "G-BGXM82S6TB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

// Export the database so your Dashboard can use it
export { db, ref, onValue };
