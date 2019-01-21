import * as firebase from "firebase";
import uuid from 'uuid';

class Fire{
  constructor(){
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAXsRxyvpSGxXY9nv_ZvJYVvBKbCZQFFbM",
        authDomain: "instagram-react-f8775.firebaseapp.com",
        databaseURL: "https://instagram-react-f8775.firebaseio.com",
        projectId: "instagram-react-f8775",
        storageBucket: "instagram-react-f8775.appspot.com",
        messagingSenderId: "108838635737"
      })
   }
  }

  /**
   * Function for loging in the user to the app
   */
  login = (userEmail,userPassword) => {
    firebase.auth().signInWithEmailAndPassword(userEmail,userPassword)
    .catch((error) => {
      alert(error);
    })
  }

  /**
   * Function for signing out current user from firebase and the app
   */
  signOut = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        firebase.auth().signOut()
        alert("Log out")
      }
    })
  }

  updateUserInfo = (uid,userInfo) =>{
    firebase.database().ref('users/' + uid ).update({userInfo: userInfo})
  }


  /**
   * Function that fetches posts from Firebase
   */
  fetchFromDB = async () =>{
    let newStatusArray = [];
    await firebase.database().ref('posts')
    .orderByChild('timestamp')
    .once('value',snapshot =>{
      let statusItems = snapshot.val();

      for (let item in statusItems) {
        newStatusArray.push({
          id: item,
          postText: statusItems[item].postText,
          imageUrl: statusItems[item].imageUrl,
          profileImageUrl: statusItems[item].profileImageUrl,
          timestamp: this.convertTimestamp(statusItems[item].timestamp),
          username: statusItems[item].username,
          postId: statusItems[item].postId,
        });
      } 
    })

    console.log("FIRE" + newStatusArray.length);
    

    return newStatusArray
  }

  fetchUserPostsFromFirebase = async (uid) => {
    let newStatusArray = [];
    
    await firebase.database().ref('user-posts/')
    .child(uid)
    .orderByChild('timestamp')
    .once('value',snapshot =>{
        let statusItems = snapshot.val();

        for (let item in statusItems) {
            newStatusArray.push({
            imageUrl: statusItems[item].imageUrl,
        });
      }
    })

    return newStatusArray
  }

  fetchUserInfo = async (uid) => {
    let response
    await firebase.database().ref('users/' + uid)
    .child('userInfo')
    .once('value',snapshot =>{
      response = snapshot.val();      
    })

    return response
  }

  /**
   * Function for getting the current user logged in
   */
  getUser = async () =>{
    let newStatusArray = [];

    try{
      const uid = firebase.auth().currentUser.uid
      console.log("Current uid" + uid);
      
    await firebase.database().ref('users/')
    .child(uid)
    .once('value',snapshot =>{
      let statusItems = snapshot.val();

        newStatusArray.push({
          uid: statusItems.uid,
          username: statusItems.username,
          imageUrl: statusItems.imageUrl,
          userInfo: statusItems.userInfo
        });
      
    })
    }catch(error){
      console.log(error);  
    }

    console.log(newStatusArray.length);
    console.log(newStatusArray[0]);

    return newStatusArray
  }

  /**
   * Function for creating a user profile and store it in Firebase Auth
   */
  createUser = async (user) => {
    console.log(user.email);
    console.log(user.password);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email,user.password)
      .then(async (userData) => {
          await this.uploadUserToDB(userData.user.uid,user)
          return true
      })
      .catch(error => this.setState({ errorMessage: error.message }))

      return false
  }

  postComment = async (postId,commentText) =>{
    console.log("Post commeent id " + postId);
    
    const responseArray = await this.getUser()

    firebase.database().ref('post-comments-by-user/' + postId).push({
      timestamp: new Date().getTime(),
      comment: commentText,
      commentUsername: responseArray[0].username,
      commentUserProfile: responseArray[0].imageUrl,
      commentUserId: responseArray[0].uid,
  })
  }


  fetchComments = async (postId) => {
    console.log('Post id' + postId);
    
    let commentArray = [];

    await firebase.database().ref('post-comments-by-user')
      .child(postId)
      .once('value',snapshot =>{
        let statusItems = snapshot.val();
        console.log("IS DIS NUÖÖ" + statusItems);
      
        for (let item in statusItems) {
          commentArray.push({
            id: item,
            commentText: statusItems[item].comment,
            profileImageUrl: statusItems[item].commentUserProfile,
            timestamp: this.convertTimestamp(statusItems[item].timestamp),
            username: statusItems[item].commentUsername,
          });
        }
    })

    return commentArray
  }
  
  /**
   * Function for uploading a user profile / object and store it in Firebase Database
   */
  uploadUserToDB = async (userId,user) => {    
    let imageUri = await this.uploadImageAsync(user.photo.uri,userId,false)

    firebase.database().ref('users/' + userId).set({
      uid: userId, 
      email: user.email,
      imageUrl: imageUri,
      username: user.username,
      userInfo:'',
    });
  }


  /**
   * Function for converting timestamp to human readable time and date
   */
  convertTimestamp = (timestamp) =>{
    let date = new Date(timestamp)

    let timeString = (date.getHours() + ":" + 
                      date.getMinutes() + " " + 
                      date.getDate() + "/"+ 
                      date.getMonth() + "/" + 
                      date.getFullYear()).toString()

    return timeString
  }

  
uploadImageAsync = async(uri,userId,isUploadingPost) => {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await urlToBlob(uri)
  let snapshot
  if(isUploadingPost){
    const ref = firebase
    .storage()
    .ref('posts/')
    .child(uuid.v4());
    snapshot = await ref.put(blob);
  }else {
    const ref = firebase
    .storage()
    .ref('user-profile-image/')
    .child(userId);
    snapshot = await ref.put(blob);
  }
  
  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

  uploadImageToDB = (url, statusText, userObject) => {

    const timestamp = new Date().getTime()

    let ref = firebase.database().ref('posts/').push()
    ref.set({
      timestamp: timestamp,
      imageUrl: url,
      postText: statusText,
      postId: ref.key,
      uid: userObject[0].uid,
      username: userObject[0].username,
      userProfileUrl: userObject[0].imageUrl,
    })

    firebase.database().ref('user-posts/').child(userObject[0].uid).push({
      timestamp: timestamp,
      imageUrl: url,
    })
  }  

}




function urlToBlob(url) {
  return new Promise((resolve, reject) => {
    
    var xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };

    xhr.open('GET', url);
    xhr.responseType = 'blob'; // convert type
    
    xhr.send();
  })
}


Fire.shared = new Fire();
export default Fire;