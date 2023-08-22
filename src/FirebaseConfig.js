import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firstConfig = {
  apiKey: "AIzaSyDmGPk9-zlIRDGWkyXIzlYZrnyScdQhfO4",
  authDomain: "weatherforecast-e7d58.firebaseapp.com",
  projectId: "weatherforecast-e7d58",
  storageBucket: "weatherforecast-e7d58.appspot.com",
  messagingSenderId: "146096696701",
  appId: "1:146096696701:web:a82466b08583e64ddc3014",
  measurementId: "G-W513QPYWGB"
};

const app = initializeApp(firstConfig,'first');
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider,app}