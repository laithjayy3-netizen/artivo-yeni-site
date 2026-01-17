// assets/js/main.js
// منطق مشترك بين جميع الصفحات
document.addEventListener('DOMContentLoaded', function() {
  // إنشاء تأثيرات الخلفية
  createBackgroundEffect();
  
  // تحديث عرض النقاط عند التحميل
  updateCoinsDisplay();
  
  // مراقبة حالة المصادقة
  firebase.auth.onAuthStateChanged(async (user) => {
    if (user) {
      // المستخدم مسجل الدخول
      await handleLoggedInUser(user);
    } else {
      // المستخدم غير مسجل
      handleLoggedOutUser();
    }
  });
  
  // جعل الشعار ينقل للصفحة الرئيسية
  const logo = document.getElementById('logo');
  if (logo) {
    logo.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  }
  
  // جعل نص الشعار ينقل للصفحة الرئيسية (إذا كان موجودًا)
  const logoText = document.getElementById('logoText');
  if (logoText) {
    logoText.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  }
});

// إنشاء تأثيرات الخلفية
function createBackgroundEffect() {
  const container = document.getElementById('backgroundEffect');
  if (!container) return;
  
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // أحجام عشوائية
    const size = Math.random() * 15 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // مواقع عشوائية
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    
    // تأخيرات متحركة مختلفة
    particle.style.animationDelay = `${Math.random() * 15}s`;
    
    container.appendChild(particle);
  }
}

// التعامل مع المستخدم المسجل
async function handleLoggedInUser(user) {
  try {
    // إظهار عناصر المستخدم المسجل
    const authButtons = document.getElementById('authButtons');
    const signOutButton = document.getElementById('signOutButton');
    const userInfo = document.getElementById('userInfo');
    const profileLink = document.getElementById('profileLink');
    const mobileProfileLink = document.getElementById('mobileProfileLink');
    const mobileSignInLink = document.getElementById('mobileSignInLink');
    const mobileSignUpLink = document.getElementById('mobileSignUpLink');
    const mobileSignOutLink = document.getElementById('mobileSignOutLink');
    
    if (authButtons) authButtons.style.display = 'none';
    if (signOutButton) signOutButton.style.display = 'block';
    if (userInfo) userInfo.style.display = 'flex';
    if (profileLink) profileLink.style.display = 'flex';
    if (mobileProfileLink) mobileProfileLink.style.display = 'flex';
    if (mobileSignInLink) mobileSignInLink.style.display = 'none';
    if (mobileSignUpLink) mobileSignUpLink.style.display = 'none';
    if (mobileSignOutLink) mobileSignOutLink.style.display = 'flex';
    
    // تحديث صورة المستخدم
    const userPhoto = document.getElementById('userPhoto');
    if (userPhoto) userPhoto.src = user.photoURL || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    
    // تحديث النقاط
    await updateUserCoins(user);
    
    // تحديث عرض النقاط
    updateCoinsDisplay();
  } catch (error) {
    console.error("Error handling logged in user:", error);
  }
}

// التعامل مع المستخدم غير المسجل
function handleLoggedOutUser() {
  // إظهار عناصر الزائر
  const authButtons = document.getElementById('authButtons');
  const signOutButton = document.getElementById('signOutButton');
  const userInfo = document.getElementById('userInfo');
  const profileLink = document.getElementById('profileLink');
  const mobileProfileLink = document.getElementById('mobileProfileLink');
  const mobileSignInLink = document.getElementById('mobileSignInLink');
  const mobileSignUpLink = document.getElementById('mobileSignUpLink');
  const mobileSignOutLink = document.getElementById('mobileSignOutLink');
  
  if (authButtons) authButtons.style.display = 'flex';
  if (signOutButton) signOutButton.style.display = 'none';
  if (userInfo) userInfo.style.display = 'none';
  if (profileLink) profileLink.style.display = 'none';
  if (mobileProfileLink) mobileProfileLink.style.display = 'none';
  if (mobileSignInLink) mobileSignInLink.style.display = 'flex';
  if (mobileSignUpLink) mobileSignUpLink.style.display = 'flex';
  if (mobileSignOutLink) mobileSignOutLink.style.display = 'none';
  
  // تحديث عرض النقاط
  updateCoinsDisplay();
}

// تحديث نقاط المستخدم
async function updateUserCoins(user) {
  try {
    // تجديد النقاط إذا دخل شهر جديد
    const renewedCoins = await userPointsFunctions.renewUserCoins(user.uid);
    
    // تحديث عرض النقاط في الصفحة
    const coinsCount = document.getElementById('coinsCount');
    if (coinsCount) coinsCount.textContent = renewedCoins;
    
    return renewedCoins;
  } catch (error) {
    console.error("Error updating user coins:", error);
    return 0;
  }
}

// تحديث عرض النقاط
function updateCoinsDisplay() {
  const user = firebase.auth.currentUser;
  const coinsDisplay = document.getElementById('coinsDisplay');
  const visitorCoinsDisplay = document.getElementById('visitorCoinsDisplay');
  const coinsCount = document.getElementById('coinsCount');
  const visitorCoinsCount = document.getElementById('visitorCoinsCount');
  
  if (user) {
    // المستخدم مسجل: إظهار نقاط المستخدم وإخفاء نقاط الزائر
    if (coinsDisplay) coinsDisplay.style.display = 'flex';
    if (visitorCoinsDisplay) visitorCoinsDisplay.style.display = 'none';
  } else {
    // زائر: إظهار نقاط الزائر وإخفاء نقاط المستخدم
    if (coinsDisplay) coinsDisplay.style.display = 'none';
    if (visitorCoinsDisplay) visitorCoinsDisplay.style.display = 'flex';
    
    // تحديث عدد نقاط الزائر
    const visitorCoins = userPointsFunctions.getVisitorCoins();
    if (visitorCoinsCount) visitorCoinsCount.textContent = visitorCoins;
  }
}