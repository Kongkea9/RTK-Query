import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  

const firebaseConfig = {
  apiKey: "AIzaSyDiXENzgJWHUT77_onT_ndI4HgoYEl9GwE",
  authDomain: "react-firebase-368cc.firebaseapp.com",
  projectId: "react-firebase-368cc",
  storageBucket: "react-firebase-368cc.appspot.com", 
  messagingSenderId: "1058654431528",
  appId: "1:1058654431528:web:521d04bb05e8c84a56481d",
  measurementId: "G-5LZZZE6YM2",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  

export { app, analytics, auth };

