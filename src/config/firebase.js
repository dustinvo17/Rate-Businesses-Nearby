import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
export const fireBaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID
}

firebase.initializeApp(fireBaseConfig)
const auth = firebase.auth()
const firestore = firebase.firestore()

export {auth,firestore,firebase}