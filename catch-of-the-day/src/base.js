import Rebase from "re-base"
import firebase from "firebase"

var config = {
    apiKey: "AIzaSyBPlNuOSq5k087iMGP7W2j2S87uwsl5L8Y",
    authDomain: "catch-of-the-day-wes-bos-ed7c1.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-wes-bos-ed7c1.firebaseio.com",
    projectId: "catch-of-the-day-wes-bos-ed7c1",
    storageBucket: "catch-of-the-day-wes-bos-ed7c1.appspot.com",
    messagingSenderId: "996381071813"
}
const firebaseApp = firebase.initializeApp(config);

const base = Rebase.createClass(firebaseApp.database())

export {firebaseApp}
export default base