import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA2AmMNJR6vTuLfFWZvEsNsH4IYB0HzCmI",
    authDomain: "ecommerce-6b410.firebaseapp.com",
    projectId: "ecommerce-6b410",
    storageBucket: "ecommerce-6b410.appspot.com",
    messagingSenderId: "436088906757",
    appId: "1:436088906757:web:b70ce869c6222775e3e86c",
    measurementId: "G-F2N759L7YP"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



