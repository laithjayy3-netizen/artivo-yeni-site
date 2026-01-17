// assets/js/auth.js
// وظائف المصادقة
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const provider = new GoogleAuthProvider();

// جعل الدوال متاحة عالمياً
window.firebaseAuth = {
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp
};

// دالة تسجيل الدخول باستخدام Google
async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(firebase.auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
}

// دالة تسجيل الدخول بالبريد الإلكتروني
async function signInWithEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(firebase.auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Email login error:", error);
    throw error;
  }
}

// دالة إنشاء حساب جديد
async function createAccount(email, password, displayName) {
  try {
    const result = await createUserWithEmailAndPassword(firebase.auth, email, password);
    const user = result.user;
    
    // تحديث اسم المستخدم
    if (displayName) {
      await updateProfile(user, { displayName });
    }
    
    // إنشاء سجل المستخدم في Firestore
    const userRef = doc(firebase.db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: displayName || user.email,
      photoURL: user.photoURL || "",
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      coins: 8, // 8 نقاط للمستخدمين المسجلين
      lastCoinRenewal: serverTimestamp()
    });
    
    return user;
  } catch (error) {
    console.error("Create account error:", error);
    throw error;
  }
}

// دالة تسجيل الخروج
async function signOutUser() {
  try {
    await signOut(firebase.auth);
    return true;
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}

// جعل الدوال متاحة عالمياً
window.authFunctions = {
  signInWithGoogle,
  signInWithEmail,
  createAccount,
  signOutUser
};