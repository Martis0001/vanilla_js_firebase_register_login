// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, update, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from
    "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig =  {
    apiKey: "AIzaSyC-ehtfogNB8EWxxw0eiMhtrtYkKD8m64g",
    databaseURL: "https://skelbimai2-1e27f-default-rtdb.europe-west1.firebasedatabase.app/",
    authDomain: "skelbimai2-1e27f.firebaseapp.com",
    projectId: "skelbimai2-1e27f",
    storageBucket: "skelbimai2-1e27f.appspot.com",
    messagingSenderId: "280937733085",
    appId: "1:280937733085:web:ab632fdb3d0c5f39f7f434"
  };
    //write your data
    



// Initialize Firebase, database, authentication
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

//new user registration
const registerNewUser = () => {
    const register_username = document.getElementById('register_username').value;
    const register_email = document.getElementById('register_email').value;
    const register_password = document.getElementById('register_password').value;

    createUserWithEmailAndPassword(auth, register_email, register_password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            set(ref(database, 'users/' + user.uid), {
                user_email: register_email,
                user_username: register_username
            });
            console.log('New User created!')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}
document.getElementById('signUp').addEventListener('click', registerNewUser);

//Login existing User
const loginUser = () => {
    const login_email = document.getElementById('login_email').value;
    const login_password = document.getElementById('login_password').value;

    signInWithEmailAndPassword(auth, login_email, login_password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const loginTime = new Date()
            update(ref(database, 'users/' + user.uid), {
                last_login: loginTime

            });
            console.log(user, "Login successful!");
            document.getElementById('login-box').style="display:none";
            document.getElementById('logged-box').style="display:contents";
            document.getElementById('user').innerText=user['email'];
            
            console.log(userCredential);



        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}
document.getElementById('signIn').addEventListener('click', loginUser);

//geting signed-in user
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //write your code what user can do 
        //or what kind of functionalities can see when he is login
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});

//sign-out
document.getElementById('signOut').addEventListener('click', () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        document.getElementById('logged-box').style="display:none";
        document.getElementById('login-box').style="display:contents";
            
        alert('Sign-out successful!')
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });
})

