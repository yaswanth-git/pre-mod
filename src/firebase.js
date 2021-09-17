import { initializeApp } from "firebase/app"
import { getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth"

//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID

const app = initializeApp({
  apiKey: "AIzaSyDbYhPDBHLQJPNZ4c230uLDdNa7qzBmp7Q",
  authDomain: "sell-a-moment-15839.firebaseapp.com",
  projectId: "sell-a-moment-15839",
  storageBucket: "sell-a-moment-15839.appspot.com",
  messagingSenderId: "361862391916",
  appId: "1:361862391916:web:50747d242d30fcffe95049",
  measurementId: "G-33H4MMXH86"
})

export const auth = getAuth()
export const db = getFirestore()
export default app
