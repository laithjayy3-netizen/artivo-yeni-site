// assets/js/firebase-init.js
// تهيئة Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtP7vIsWgewl1FPCey1hvUwE3b0Sf2n7Y",
  authDomain: "artivo-ai.firebaseapp.com",
  projectId: "artivo-ai",
  storageBucket: "artivo-ai.firebasestorage.app",
  messagingSenderId: "163714923364",
  appId: "1:163714923364:web:2f776e51541d5a77a79871",
  measurementId: "G-PJP5PJPQ2G"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// جعل الدوال متاحة عالمياً
window.firebase = {
  auth,
  db
};