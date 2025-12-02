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

// 1. Setup Firebase Config
// For local development with emulators, these values don't need to be real yet.
// When you deploy, you will replace these with keys from the Firebase Console.
const firebaseConfig = {
  apiKey: "fake-api-key-for-local-dev",
  authDomain: "localhost",
  projectId: "flood-support-local",
  storageBucket: "flood-support-local.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:123456789abc"
};

// 2. Initialize App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 3. Connect to Local Emulator (Only in development)
// Uncomment these lines when you run "firebase emulators:start"
if (location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  console.log("🔥 Connected to Auth Emulator");
}

const googleProvider = new GoogleAuthProvider();

export { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInAnonymously, 
  signOut,
  onAuthStateChanged 
};