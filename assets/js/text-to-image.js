// assets/js/text-to-image.js
// منطق خاص بصفحة توليد الصور
document.addEventListener('DOMContentLoaded', function() {
  // العناصر الأساسية
  const textarea = document.getElementById('prompt');
  const charCount = document.getElementById('charCount');
  const result = document.getElementById('result');
  const generateBtn = document.getElementById('generateBtn');
  const loading = document.getElementById('loading');
  
  // نافذة طلب النقاط
  const visitorCoinsModal = document.getElementById('visitorCoinsModal');
  const userCoinsModal = document.getElementById('userCoinsModal');
  const closeVisitorModal = document.getElementById('closeVisitorModal');
  const closeUserModal = document.getElementById('closeUserModal');
  const modalSignInBtn = document.getElementById('modalSignInBtn');
  const modalSignUpBtn = document.getElementById('modalSignUpBtn');
  const whatsappLink = document.getElementById('whatsappLink');
  
  // إخفاء مؤشر التحميل في البداية
  loading.style.display = 'none';
  
  // تحديث عداد الأحرف (2000 حرف الآن)
  function updateCharCount() {
    const remaining = 2000 - textarea.value.length;
    const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
    const charsRemainingText = t && t.textToImage ? t.textToImage.charsRemaining : "حرف متبقي";
    charCount.textContent = `${remaining} ${charsRemainingText}`;
  }
  
  // تحديث العداد عند التحميل
  updateCharCount();
  
  // تحديث العداد عند الكتابة
  textarea.addEventListener('input', updateCharCount);
  
  // تفعيل زر Enter لتوليد الصورة
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateImage();
    }
  });
  
  // إدارة نافذة طلب النقاط
  closeVisitorModal.addEventListener('click', () => {
    visitorCoinsModal.style.display = 'none';
  });
  
  visitorCoinsModal.addEventListener('click', (e) => {
    if (e.target === visitorCoinsModal) {
      visitorCoinsModal.style.display = 'none';
    }
  });
  
  closeUserModal.addEventListener('click', () => {
    userCoinsModal.style.display = 'none';
  });
  
  userCoinsModal.addEventListener('click', (e) => {
    if (e.target === userCoinsModal) {
      userCoinsModal.style.display = 'none';
    }
  });
  
  modalSignInBtn.addEventListener('click', () => {
    visitorCoinsModal.style.display = 'none';
    document.getElementById('signInButton').click();
  });
  
  modalSignUpBtn.addEventListener('click', () => {
    visitorCoinsModal.style.display = 'none';
    document.getElementById('signUpButton').click();
  });
  
  // إضافة مستمع الأحداث لزر التوليد
  generateBtn.addEventListener('click', generateImage);
  
  // وظيفة توليد الصور (معدلة لاستخدام fetch بدلاً من Image)
  async function generateImage() {
    const user = firebase.auth.currentUser;
    let isVisitor = false;
    let coins;
    
    if (user) {
      // المستخدم مسجل: الحصول على رصيده من Firestore
      try {
        coins = await userPointsFunctions.getUserCoins(user.uid);
        if (coins < 1) {
          // عرض نافذة نقاط المستخدم المنتهية
          userCoinsModal.style.display = 'flex';
          return;
        }
      } catch (error) {
        console.error("Error getting user coins:", error);
        coins = 8; // رصيد افتراضي للمستخدم الجديد
      }
    } else {
      // زائر: استخدام نقاط الزوار
      isVisitor = true;
      coins = userPointsFunctions.getVisitorCoins();
      if (coins < 1) {
        // عرض نافذة نقاط الزائر المنتهية
        visitorCoinsModal.style.display = 'flex';
        return;
      }
    }
    
    const prompt = textarea.value.trim();
    if (!prompt) {
      // استخدام الترجمات إذا كانت متاحة
      const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
      const errorMessage = t && t.textToImage ? "يرجى كتابة وصف التصميم." : "يرجى كتابة وصف التصميم.";
      alert(errorMessage);
      return;
    }
    
    // خصم نقطة واحدة
    try {
      if (isVisitor) {
        const newCoins = userPointsFunctions.updateVisitorCoins(coins - 1);
        document.getElementById('visitorCoinsCount').textContent = newCoins;
      } else {
        await userPointsFunctions.deductUserCoins(user.uid, 1);
        // تحديث عرض النقاط
        const updatedCoins = await userPointsFunctions.getUserCoins(user.uid);
        document.getElementById('coinsCount').textContent = updatedCoins;
      }
      
      // تحديث عرض النقاط
      if (window.updateCoinsDisplay) {
        window.updateCoinsDisplay();
      }
    } catch (error) {
      console.error("Error deducting coins:", error);
      // استخدام الترجمات إذا كانت متاحة
      const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
      const errorMessage = t && t.textToImage ? "حدث خطأ في خصم النقاط." : "حدث خطأ في خصم النقاط.";
      alert(errorMessage);
      return;
    }
    
    // إظهار مؤشر التحميل
    loading.style.display = 'flex';
    result.innerHTML = '';
    result.appendChild(loading);
    
    try {
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
      
      // استخدام fetch بدلاً من Image لحل مشكلة CORS
      const response = await fetch(imageUrl);
      
      if (!response.ok) {
        throw new Error('فشل في جلب الصورة: ' + response.status);
      }
      
      const blob = await response.blob();
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => {
          reject(new Error('فشل تحميل الصورة'));
        };
      });
      
      const croppedHeight = img.height - 60;
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = croppedHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, croppedHeight, 0, 0, img.width, croppedHeight);
      
      // إضافة النص المائي
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.font = "30px 'Tajawal', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("www.artivo.pro", img.width - 20, croppedHeight - 15);
      
      const container = document.createElement("div");
      container.className = "image-container";
      container.appendChild(canvas);
      
      const downloadButton = document.createElement("button");
      downloadButton.className = "download-btn";
      
      // استخدام الترجمات إذا كانت متاحة
      const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
      const downloadText = t && t.textToImage ? t.textToImage.download : "تحميل الصورة";
      downloadButton.innerHTML = `<i class="fas fa-download"></i> ${downloadText}`;
      
      downloadButton.addEventListener('click', () => {
        const link = document.createElement("a");
        link.download = "artivo-design.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        showDownloadMessage();
      });
      
      result.innerHTML = '';
      result.appendChild(container);
      result.appendChild(downloadButton);
      
      // تحرير الذاكرة
      URL.revokeObjectURL(img.src);
      
      // حفظ الصورة في سجل المستخدم إذا كان مسجلاً
      if (user && !isVisitor) {
        try {
          const userRef = firebase.doc(firebase.db, "users", user.uid);
          const userDoc = await firebase.getDoc(userRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const designs = userData.designs || [];
            
            // إضافة التصميم الجديد إلى السجل
            designs.push({
              image: canvas.toDataURL("image/png"),
              prompt: prompt,
              timestamp: firebase.serverTimestamp()
            });
            
            // تحديث سجل التصميمات في Firestore
            await firebase.updateDoc(userRef, {
              designs: designs
            });
          }
        } catch (error) {
          console.error("Error saving design to user history:", error);
        }
      }
    } catch (error) {
      console.error("حدث خطأ:", error);
      
      // استخدام الترجمات إذا كانت متاحة
      const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
      const errorMessage = t && t.textToImage ? t.textToImage.imageError || "حدث خطأ أثناء إنشاء التصميم. يرجى المحاولة مرة أخرى." : "حدث خطأ أثناء إنشاء التصميم. يرجى المحاولة مرة أخرى.";
      
      result.innerHTML = `<p class="error">❌ ${errorMessage}</p>`;
      
      // استعادة النقطة في حالة الخطأ
      try {
        if (isVisitor) {
          const newCoins = userPointsFunctions.updateVisitorCoins(coins);
          document.getElementById('visitorCoinsCount').textContent = newCoins;
        } else if (user) {
          await userPointsFunctions.renewUserCoins(user.uid);
          // تحديث عرض النقاط
          const updatedCoins = await userPointsFunctions.getUserCoins(user.uid);
          document.getElementById('coinsCount').textContent = updatedCoins;
        }
        
        // تحديث عرض النقاط بعد الخطأ
        if (window.updateCoinsDisplay) {
          window.updateCoinsDisplay();
        }
      } catch (error) {
        console.error("Error restoring coins:", error);
      }
    }
  }
  
  // رسالة تحميل ناجحة
  function showDownloadMessage() {
    const msg = document.createElement('div');
    msg.className = 'download-message show';
    
    // استخدام الترجمات إذا كانت متاحة
    const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
    const successMessage = t && t.textToImage ? t.textToImage.downloadSuccess || "تم التحميل بنجاح" : "تم التحميل بنجاح";
    
    msg.innerHTML = `<i class="fas fa-check-circle"></i> ${successMessage}`;
    result.appendChild(msg);
    
    setTimeout(() => {
      msg.classList.remove('show');
      setTimeout(() => {
        if (msg.parentNode) msg.parentNode.removeChild(msg);
      }, 300);
    }, 3000);
  }
  
  // منع كليك يمين على الصورة
  document.addEventListener("contextmenu", function (e) {
    if (e.target.tagName === "CANVAS") {
      e.preventDefault();
    }
  });
  
  // جعل الدوال متاحة عالمياً إذا لزم الأمر
  window.textToImageFunctions = {
    generateImage,
    updateCharCount
  };
});