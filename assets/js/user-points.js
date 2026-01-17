// assets/js/user-points.js
// نظام النقاط
import { doc, getDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// مفتاح تخزين نقاط الزوار
const VISITOR_COINS_KEY = 'visitor_coins';

// دالة الحصول على نقاط الزائر
function getVisitorCoins() {
  let visitorCoins = localStorage.getItem(VISITOR_COINS_KEY);
  
  // إذا لم يكن هناك نقاط مخزنة، نعطي 2 نقاط
  if (visitorCoins === null) {
    visitorCoins = 2;
    localStorage.setItem(VISITOR_COINS_KEY, visitorCoins);
  } else {
    visitorCoins = parseInt(visitorCoins);
  }
  
  return visitorCoins;
}

// دالة تحديث نقاط الزائر
function updateVisitorCoins(coins) {
  localStorage.setItem(VISITOR_COINS_KEY, coins);
  return coins;
}

// دالة الحصول على نقاط المستخدم المسجل
async function getUserCoins(userId) {
  try {
    const userRef = doc(firebase.db, "users", userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data().coins;
    } else {
      // إنشاء سجل المستخدم إذا لم يكن موجوداً
      await setDoc(userRef, {
        uid: userId,
        coins: 8, // 8 نقاط للمستخدمين المسجلين
        lastCoinRenewal: serverTimestamp()
      });
      return 8;
    }
  } catch (error) {
    console.error("Get user coins error:", error);
    return 0;
  }
}

// دالة خصم النقاط من المستخدم المسجل
async function deductUserCoins(userId, amount = 1) {
  try {
    const userRef = doc(firebase.db, "users", userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const currentCoins = userDoc.data().coins;
      
      if (currentCoins >= amount) {
        await updateDoc(userRef, {
          coins: currentCoins - amount
        });
        return currentCoins - amount;
      } else {
        throw new Error("Not enough coins");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Deduct user coins error:", error);
    throw error;
  }
}

// دالة تجديد نقاط المستخدم (شهرياً)
async function renewUserCoins(userId) {
  try {
    const userRef = doc(firebase.db, "users", userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const now = new Date();
      const lastRenewal = userData.lastCoinRenewal?.toDate() || now;
      
      // تجديد النقاط إذا دخل شهر جديد
      if (lastRenewal.getMonth() !== now.getMonth() || 
          lastRenewal.getFullYear() !== now.getFullYear()) {
        
        const newCoins = Math.min(8, (userData.coins || 0) + 8);
        await updateDoc(userRef, {
          coins: newCoins,
          lastCoinRenewal: serverTimestamp()
        });
        
        return newCoins;
      } else {
        return userData.coins;
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Renew user coins error:", error);
    throw error;
  }
}

// جعل الدوال متاحة عالمياً
window.userPointsFunctions = {
  getVisitorCoins,
  updateVisitorCoins,
  getUserCoins,
  deductUserCoins,
  renewUserCoins
};