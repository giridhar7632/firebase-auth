import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyBVSC0B0fb83U_OIdhMYsajg4CuZwlnUuo",
  authDomain: "authentication-ce8b8.firebaseapp.com",
  projectId: "authentication-ce8b8",
  storageBucket: "authentication-ce8b8.appspot.com",
  messagingSenderId: "232567302036",
  appId: "1:232567302036:web:932fe25b806bd358dcd181"
})

export const auth = app.auth()
export default app