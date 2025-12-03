import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  connectAuthEmulator, 
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { 
  getFirestore, 
  connectFirestoreEmulator,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  getDocs
} from "firebase/firestore";

// 1. Setup Firebase Config
const firebaseConfig = {
  apiKey: "fake-api-key-for-local-dev",
  authDomain: "localhost",
  projectId: "flood-support-local",
  storageBucket: "flood-support-local.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:123456789abc"
};

// 2. Initialize App & Services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 3. Connect to Emulators (Local Development)
if (location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, 'localhost', 8080);
  console.log("🔥 Connected to Auth & Firestore Emulators");
}

const googleProvider = new GoogleAuthProvider();

export { 
  auth, 
  db,
  googleProvider, 
  signInWithPopup, 
  signInAnonymously, 
  signOut, 
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  getDocs
};