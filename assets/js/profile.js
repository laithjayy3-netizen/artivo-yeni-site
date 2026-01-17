// assets/js/profile.js
// منطق خاص بصفحة الملف الشخصي
document.addEventListener('DOMContentLoaded', function() {
  // حساب الوقت المتبقي للتجديد (بداية الشهر القادم)
  function calculateRenewalTime() {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const diffTime = nextMonth - now;
    
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return {
      days: days,
      hours: hours
    };
  }
  
  // تحديث المؤقت
  function updateRenewalTimer() {
    const renewalTime = calculateRenewalTime();
    const renewalTimer = document.getElementById('renewalTimer');
    if (renewalTimer) {
      renewalTimer.textContent = `${renewalTime.days} أيام و ${renewalTime.hours} ساعات`;
    }
  }
  
  // تحديث المؤقت عند التحميل
  updateRenewalTimer();
  
  // تحديث المؤقت كل ساعة
  setInterval(updateRenewalTimer, 3600000); // كل ساعة
  
  // تغيير الصورة الشخصية
  const changeAvatarBtn = document.getElementById('changeAvatarBtn');
  const avatarInput = document.getElementById('avatarInput');
  const profileAvatar = document.getElementById('profileAvatar');
  const userPhoto = document.getElementById('userPhoto');
  
  if (changeAvatarBtn && avatarInput) {
    changeAvatarBtn.addEventListener('click', () => {
      avatarInput.click();
    });
    
    avatarInput.addEventListener('change', function(e) {
      if (this.files && this.files[0]) {
        const file = this.files[0];
        
        // التحقق من حجم الملف (1MB كحد أقصى)
        if (file.size > 1048576) {
          alert('حجم الصورة كبير جداً! الحد الأقصى 1MB');
          return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
          if (profileAvatar) profileAvatar.src = e.target.result;
          
          // تحديث الصورة في الهيدر
          if (userPhoto) userPhoto.src = e.target.result;
        }
        
        reader.readAsDataURL(file);
      }
    });
  }
  
  // معالجة إرسال نموذج الحساب
  const accountForm = document.getElementById('accountForm');
  if (accountForm) {
    accountForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const fullName = document.getElementById('fullName').value;
      const phone = document.getElementById('phone').value;
      
      // تحديث الاسم في الهيدر
      const userNameElement = document.getElementById('userName');
      if (userNameElement) {
        userNameElement.textContent = fullName;
      }
      
      // تحديث الاسم في الصفحة
      const profileName = document.getElementById('profileName');
      if (profileName) {
        profileName.textContent = fullName;
      }
      
      // إظهار رسالة النجاح
      const saveMessage = document.getElementById('saveMessage');
      if (saveMessage) {
        saveMessage.style.display = 'block';
        
        setTimeout(() => {
          saveMessage.style.display = 'none';
        }, 3000);
      }
    });
  }
  
  // عرض سجل النشاط
  const showActivityBtn = document.getElementById('showActivityBtn');
  const activityHistory = document.getElementById('activityHistory');
  
  if (showActivityBtn && activityHistory) {
    showActivityBtn.addEventListener('click', function() {
      activityHistory.style.display = activityHistory.style.display === 'block' ? 'none' : 'block';
    });
  }
  
  // مراقبة حالة المصادقة لتحديث بيانات الملف الشخصي
  firebase.auth.onAuthStateChanged(async (user) => {
    if (user) {
      // المستخدم مسجل الدخول
      const profileName = document.getElementById('profileName');
      const profileEmail = document.getElementById('profileEmail');
      const emailDisplay = document.getElementById('emailDisplay');
      const fullName = document.getElementById('fullName');
      
      if (profileName) profileName.textContent = user.displayName || user.email;
      if (profileEmail) profileEmail.textContent = user.email;
      if (emailDisplay) emailDisplay.textContent = user.email;
      if (fullName) fullName.value = user.displayName || '';
      
      // تحديث الصورة
      const profileAvatar = document.getElementById('profileAvatar');
      if (profileAvatar) {
        profileAvatar.src = user.photoURL || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
      }
      
      // تحديث معلومات المستخدم من Firestore
      try {
        const userRef = firebase.doc(firebase.db, "users", user.uid);
        const userDoc = await firebase.getDoc(userRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const coinsCount = document.getElementById('coinsCount');
          const coinsCountLarge = document.getElementById('coinsCountLarge');
          const coinsValue = document.getElementById('coinsValue');
          const designsCount = document.getElementById('designsCount');
          
          // تحديث جميع عناصر النقاط
          if (coinsCount) coinsCount.textContent = userData.coins;
          if (coinsCountLarge) coinsCountLarge.textContent = userData.coins;
          if (coinsValue) coinsValue.textContent = userData.coins;
          if (designsCount) designsCount.textContent = userData.designs ? userData.designs.length : 0;
          
          // عرض سجل التصميمات إذا كان موجوداً
          if (userData.designs && userData.designs.length > 0) {
            displayDesignHistory(userData.designs);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      // المستخدم غير مسجل - إعادة التوجيه إلى الصفحة الرئيسية
      window.location.href = 'index.html';
    }
  });
  
  // عرض سجل التصميمات
  function displayDesignHistory(designs) {
    const historyGrid = document.getElementById('historyGrid');
    if (!historyGrid) return;
    
    historyGrid.innerHTML = '';
    
    // عرض آخر 10 تصميمات فقط
    const recentDesigns = designs.slice(0, 10);
    
    recentDesigns.forEach(design => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      
      historyItem.innerHTML = `
        <img src="${design.image}" alt="التصميم">
        <div class="history-date">${new Date(design.timestamp).toLocaleDateString()}</div>
      `;
      
      historyGrid.appendChild(historyItem);
    });
  }
});