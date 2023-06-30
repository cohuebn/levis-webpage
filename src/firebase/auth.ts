import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getFirebaseApp } from "./firebaseApp";

const provider = new GoogleAuthProvider();

export function signInWithGoogle() {
  const firebaseApp = getFirebaseApp();
  const auth = getAuth(firebaseApp);
  return signInWithPopup(auth, provider);
}
