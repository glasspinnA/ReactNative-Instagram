import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyAXsRxyvpSGxXY9nv_ZvJYVvBKbCZQFFbM",
    authDomain: "instagram-react-f8775.firebaseapp.com",
    databaseURL: "https://instagram-react-f8775.firebaseio.com",
    projectId: "instagram-react-f8775",
    storageBucket: "instagram-react-f8775.appspot.com",
    messagingSenderId: "108838635737"
  };
var fire = firebase.initializeApp(config);
export default fire;