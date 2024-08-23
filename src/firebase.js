import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore/lite';
// ทำการ import library ของ Firebase Auth
import { getAuth, connectAuthEmulator } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAnvjUAlP-QW6M236C_9PdqHnfvdDffpCg",
    authDomain: "ecommerce-easy-vue.firebaseapp.com",
    databaseURL: "https://ecommerce-easy-vue-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ecommerce-easy-vue",
    storageBucket: "ecommerce-easy-vue.appspot.com",
    messagingSenderId: "404262635279",
    appId: "1:404262635279:web:f2eecd8d497b57e503a07a"
};


// Initialize Firebase ss
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// ใช้ emu
connectFirestoreEmulator(db, '127.0.0.1', 8080);

// ทำการเพิ่ม Firebase Auth เข้ามา

const auth = getAuth();
connectAuthEmulator(auth, 'http://127.0.0.1:9099');
export {
    db,
    auth
};