// assets/js/chat-assistant.js
// منطق خاص بصفحة المساعد الذكي
document.addEventListener('DOMContentLoaded', function() {
  // الحصول على العناصر الأساسية من الصفحة
  const chatMessages = document.getElementById('chatMessages');
  const userInput = document.getElementById('userInput');
  const sendButton = document.getElementById('sendButton');
  
  // متغير لتخزين محادثة المستخدم
  let conversationHistory = [];
  let currentQuestionIndex = 0;
  let userAnswers = [];
  let generatedPrompt = "";
  let isModificationMode = false; // متغير لتتبع وضع التعديل
  
  // تهيئة المحادثة عند تحميل الصفحة
  function initializeChat() {
    // مسح أي رسائل قديمة
    chatMessages.innerHTML = '';
    
    // الحصول على الترجمات الحالية
    const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
    const chatAssistant = t ? t.chatAssistant : null;
    
    // إضافة رسالة ترحيبية من البوت باللغة الحالية
    addBotMessage(chatAssistant ? chatAssistant.welcomeMessage : "مرحباً! أنا المساعد الذكي للمصممين. سأساعدك في تصميم الغرفة المثالية لك. لنبدأ ببعض الأسئلة لفهم احتياجاتك بشكل أفضل.");
    
    // بدء الأسئلة
    setTimeout(() => {
      askQuestion();
    }, 1500);
  }
  
  // وظيفة إضافة رسالة من البوت
  function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    
    messageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-robot"></i>
      </div>
      <div class="message-content">
        ${message}
      </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
  }
  
  // وظيفة إضافة رسالة من المستخدم
  function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    
    messageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-user"></i>
      </div>
      <div class="message-content">
        ${message}
      </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    
    // حفظ الرسالة في تاريخ المحادثة
    conversationHistory.push({
      type: 'user',
      message: message,
      timestamp: new Date()
    });
  }
  
  // وظيفة إضافة صورة في المحادثة
  function addImageToChat(imageUrl, canvasElement) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    
    // الحصول على الترجمات الحالية
    const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
    const chatAssistant = t ? t.chatAssistant : null;
    const questionText = chatAssistant ? chatAssistant.designQuestion : "هل أعجبك التصميم أم تريد التعديل عليه؟";
    
    messageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-robot"></i>
      </div>
      <div class="message-content">
        <p>${chatAssistant ? chatAssistant.designReady : "هذا هو التصميم المقترح بناءً على طلبك:"}</p>
        <div class="image-container">
          <img src="${imageUrl}" alt="التصميم المقترح" class="message-image" oncontextmenu="return false;">
        </div>
        <div style="margin-top: 15px;">
          <button onclick="downloadImage('${imageUrl}')" class="download-btn" style="background: var(--success); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 10px;">
            <i class="fas fa-download"></i> ${chatAssistant ? chatAssistant.downloadButton : "تحميل الصورة"}
          </button>
        </div>
        <p style="margin-top: 15px; font-weight: 500;">${questionText}</p>
        <div style="margin-top: 10px;">
          <button onclick="handleImageFeedback('yes')" style="background: var(--success); color: white; border: none; padding: 8px 15px; border-radius: 5px; margin-left: 10px; cursor: pointer;">
            <i class="fas fa-check"></i> ${chatAssistant ? chatAssistant.yesButton : "نعم"}
          </button>
          <button onclick="handleImageFeedback('no')" style="background: var(--error); color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">
            <i class="fas fa-times"></i> ${chatAssistant ? chatAssistant.noButton : "لا"}
          </button>
        </div>
      </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    
    // تخزين الكانفاس للتحميل لاحقاً
    window.currentCanvas = canvasElement;
  }
  
  // وظيفة تحميل الصورة
  window.downloadImage = function(imageUrl) {
    if (window.currentCanvas) {
      const link = document.createElement("a");
      link.download = "artivo-design.png";
      link.href = window.currentCanvas.toDataURL("image/png");
      link.click();
      
      // إظهار رسالة نجاح
      showDownloadMessage();
    }
  };
  
  // وظيفة إظهار رسالة التحميل الناجح
  function showDownloadMessage() {
    const msg = document.createElement('div');
    msg.className = 'download-message';
    msg.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--success);
      color: white;
      padding: 12px 20px;
      border-radius: 30px;
      font-size: 0.9rem;
      z-index: 9999;
      animation: fadeInOut 3s ease;
    `;
    
    const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
    const chatAssistant = t ? t.chatAssistant : null;
    msg.innerHTML = `<i class="fas fa-check-circle"></i> ${chatAssistant ? chatAssistant.downloadSuccess : "تم تحميل الصورة بنجاح"}`;
    
    document.body.appendChild(msg);
    
    setTimeout(() => {
      if (msg.parentNode) msg.parentNode.removeChild(msg);
    }, 3000);
  }
  
  // وظيفة التمرير لأسفل المحادثة
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // وظيفة طرح السؤال التالي
  function askQuestion() {
    const t = window.languageFunctions ? window.languageFunctions : null;
    const questions = t ? t.getQuestions() : null;
    
    if (currentQuestionIndex < questions.length) {
      addBotMessage(questions[currentQuestionIndex]);
    } else {
      // انتهت الأسئلة، إنشاء التصميم
      generateDesign();
    }
  }
  
  // معالجة إرسال الرسالة
  function sendMessage() {
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // إضافة رسالة المستخدم
    addUserMessage(message);
    
    // مسح حقل الإدخال
    userInput.value = '';
    
    // إذا كنا في وضع التعديل
    if (isModificationMode) {
      // معالجة التعديلات مباشرة
      handleModification(message);
      return;
    }
    
    // حفظ إجابة المستخدم
    const t = window.languageFunctions ? window.languageFunctions : null;
    const questions = t ? t.getQuestions() : null;
    userAnswers.push({
      question: questions[currentQuestionIndex],
      answer: message
    });
    
    // الانتقال للسؤال التالي
    currentQuestionIndex++;
    
    // إظهار مؤشر الكتابة
    showTypingIndicator();
    
    // انتظار قصير ثم طرح السؤال التالي
    setTimeout(() => {
      removeTypingIndicator();
      askQuestion();
    }, 1000);
  }
  
  // وظيفة معالجة التعديلات
  async function handleModification(modification) {
    // إظهار مؤشر الكتابة
    showTypingIndicator();
    
    // تعطيل الإدخال مؤقتاً
    userInput.disabled = true;
    sendButton.disabled = true;
    
    setTimeout(async () => {
      removeTypingIndicator();
      
      // التحقق من النقاط أولاً
      const user = firebase.auth.currentUser;
      let hasEnoughCoins = false;
      
      if (user) {
        try {
          const coins = await userPointsFunctions.getUserCoins(user.uid);
          if (coins >= 1) {
            hasEnoughCoins = true;
            // خصم نقطة
            await userPointsFunctions.deductUserCoins(user.uid, 1);
            // تحديث عرض النقاط
            const updatedCoins = await userPointsFunctions.getUserCoins(user.uid);
            document.getElementById('coinsCount').textContent = updatedCoins;
          } else {
            const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
            const chatAssistant = t ? t.chatAssistant : null;
            addBotMessage(chatAssistant ? chatAssistant.noCoins : "عذراً، لقد استنفدت نقاطك المجانية لهذا الشهر. يمكنك طلب المزيد من النقاط عبر التواصل معنا على واتساب.");
            return;
          }
        } catch (error) {
          console.error("Error checking coins:", error);
          const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
          const chatAssistant = t ? t.chatAssistant : null;
          addBotMessage(chatAssistant ? chatAssistant.errorCheckingCoins : "حدث خطأ في التحقق من النقاط. يرجى المحاولة مرة أخرى.");
          return;
        }
      } else {
        // زائر
        const visitorCoins = userPointsFunctions.getVisitorCoins();
        if (visitorCoins >= 1) {
          hasEnoughCoins = true;
          // خصم نقطة
          userPointsFunctions.updateVisitorCoins(visitorCoins - 1);
          document.getElementById('visitorCoinsCount').textContent = visitorCoins - 1;
        } else {
          const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
          const chatAssistant = t ? t.chatAssistant : null;
          addBotMessage(chatAssistant ? chatAssistant.noCoinsVisitor : "عذراً، لقد استنفدت نقاطك المجانية. سجل دخولك للحصول على 8 نقاط مجانية كل شهر!");
          return;
        }
      }
      
      if (!hasEnoughCoins) return;
      
      const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
      const chatAssistant = t ? t.chatAssistant : null;
      addBotMessage(chatAssistant ? chatAssistant.generatingDesign : "جاري تطبيق التعديلات المطلوبة وإنشاء تصميم جديد...");
      
      // تعديل الـ Prompt الحالي مع إضافة التعديلات
      generatedPrompt += "، مع تعديلات: " + modification;
      
      // إظهار مؤشر التحميل
      showTypingIndicator();
      
      // توليد الصورة المعدلة
      try {
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(generatedPrompt)}`;
        
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error('فشل في جلب الصورة');
        
        const blob = await response.blob();
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        
        // قص الصورة من الأسفل بمسافة 60 بكسل
        const croppedHeight = img.height - 60;
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = croppedHeight;
        const ctx = canvas.getContext("2d");
        
        // رسم الجزء المطلوب من الصورة (بدون الجزء السفلي)
        ctx.drawImage(img, 0, 0, img.width, croppedHeight, 0, 0, img.width, croppedHeight);
        
        // إضافة العلامة المائية بعد القص
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.font = "30px 'Tajawal', sans-serif";
        ctx.textAlign = "right";
        ctx.fillText("www.artivo.pro", img.width - 20, croppedHeight - 15);
        
        // تحويل الكانفاس إلى صورة للعرض
        const finalImageUrl = canvas.toDataURL("image/png");
        
        removeTypingIndicator();
        addImageToChat(finalImageUrl, canvas);
        
        // تحرير الذاكرة
        URL.revokeObjectURL(img.src);
        
      } catch (error) {
        console.error("Error generating modified image:", error);
        removeTypingIndicator();
        const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
        const chatAssistant = t ? t.chatAssistant : null;
        addBotMessage(chatAssistant ? chatAssistant.errorGenerating : "عذراً، حدث خطأ أثناء إنشاء التصميم المعدل. يرجى المحاولة مرة أخرى.");
        
        // استعادة النقطة في حالة الخطأ
        if (user) {
          await userPointsFunctions.renewUserCoins(user.uid);
        } else {
          const currentCoins = userPointsFunctions.getVisitorCoins();
          userPointsFunctions.updateVisitorCoins(currentCoins + 1);
        }
      }
      
      // تفعيل الإدخال مرة أخرى
      userInput.disabled = false;
      sendButton.disabled = false;
      // الخروج من وضع التعديل
      isModificationMode = false;
    }, 1500);
  }
  
  // إظهار مؤشر الكتابة
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-message';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-robot"></i>
      </div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
  }
  
  // إخفاء مؤشر الكتابة
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  
  // وظيفة إنشاء الـ Prompt احترافي
  function createProfessionalPrompt() {
    let prompt = "تصميم داخلي احترافي لـ ";
    
    // إضافة نوع الغرفة
    const roomType = userAnswers[0].answer;
    prompt += roomType + "، ";
    
    // إضافة الأبعاد
    const dimensions = userAnswers[1].answer;
    prompt += "بأبعاد " + dimensions + "، ";
    
    // إضافة مواقع النوافذ
    const windows = userAnswers[2].answer;
    prompt += "مع نوافذ " + windows + "، ";
    
    // إضافة مواقع الأبواب
    const doors = userAnswers[3].answer;
    prompt += "وأبواب " + doors + "، ";
    
    // إضافة الأسلوب التصميمي
    const style = userAnswers[4].answer;
    prompt += "بأسلوب " + style + "، ";
    
    // إضافة الألوان
    const colors = userAnswers[5].answer;
    prompt += "بألوان " + colors + "، ";
    
    // إضافة الإضاءة
    const lighting = userAnswers[6].answer;
    prompt += "مع إضاءة " + lighting + "، ";
    
    // إضافة الأثاث
    const furniture = userAnswers[7].answer;
    if (furniture && furniture.toLowerCase() !== "لا") {
      prompt += "يتضمن " + furniture + "، ";
    }
    
    // إضافة الميزانية
    const budget = userAnswers[8].answer;
    prompt += "بميزانية " + budget + "، ";
    
    // إضافة المتطلبات الخاصة
    const special = userAnswers[9].answer;
    if (special && special.toLowerCase() !== "لا") {
      prompt += special;
    }
    
    // إضافة جودة الصورة
    prompt += "، صورة عالية الجودة، واقعية، تفاصيل دقيقة، احترافية";
    
    return prompt;
  }
  
  // وظيفة التحقق من النقاط وتوليد الصورة
  async function generateDesign() {
    // التحقق من النقاط أولاً
    const user = firebase.auth.currentUser;
    let hasEnoughCoins = false;
    
    if (user) {
      // المستخدم مسجل
      try {
        const coins = await userPointsFunctions.getUserCoins(user.uid);
        if (coins >= 1) {
          hasEnoughCoins = true;
          // خصم نقطة
          await userPointsFunctions.deductUserCoins(user.uid, 1);
          // تحديث عرض النقاط
          const updatedCoins = await userPointsFunctions.getUserCoins(user.uid);
          document.getElementById('coinsCount').textContent = updatedCoins;
        } else {
          const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
          const chatAssistant = t ? t.chatAssistant : null;
          addBotMessage(chatAssistant ? chatAssistant.noCoins : "عذراً، لقد استنفدت نقاطك المجانية لهذا الشهر. يمكنك طلب المزيد من النقاط عبر التواصل معنا على واتساب.");
          return;
        }
      } catch (error) {
        console.error("Error checking coins:", error);
        const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
        const chatAssistant = t ? t.chatAssistant : null;
        addBotMessage(chatAssistant ? chatAssistant.errorCheckingCoins : "حدث خطأ في التحقق من النقاط. يرجى المحاولة مرة أخرى.");
        return;
      }
    } else {
      // زائر
      const visitorCoins = userPointsFunctions.getVisitorCoins();
      if (visitorCoins >= 1) {
        hasEnoughCoins = true;
        // خصم نقطة
        userPointsFunctions.updateVisitorCoins(visitorCoins - 1);
        document.getElementById('visitorCoinsCount').textContent = visitorCoins - 1;
      } else {
        const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
        const chatAssistant = t ? t.chatAssistant : null;
        addBotMessage(chatAssistant ? chatAssistant.noCoinsVisitor : "عذراً، لقد استنفدت نقاطك المجانية. سجل دخولك للحصول على 8 نقاط مجانية كل شهر!");
        return;
      }
    }
    
    if (!hasEnoughCoins) return;
    
    const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
    const chatAssistant = t ? t.chatAssistant : null;
    addBotMessage(chatAssistant ? chatAssistant.generatingDesign : "شكراً لك على جميع المعلومات! الآن سأقوم بإنشاء التصميم المثالي لك بناءً على إجاباتك...");
    
    // إنشاء الـ Prompt احترافي
    generatedPrompt = createProfessionalPrompt();
    
    // إظهار مؤشر التحميل
    showTypingIndicator();
    
    // توليد الصورة
    try {
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(generatedPrompt)}`;
      
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('فشل في جلب الصورة');
      
      const blob = await response.blob();
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      
      // قص الصورة من الأسفل بمسافة 60 بكسل
      const croppedHeight = img.height - 60;
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = croppedHeight;
      const ctx = canvas.getContext("2d");
      
      // رسم الجزء المطلوب من الصورة (بدون الجزء السفلي)
      ctx.drawImage(img, 0, 0, img.width, croppedHeight, 0, 0, img.width, croppedHeight);
      
      // إضافة العلامة المائية بعد القص
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.font = "30px 'Tajawal', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("www.artivo.pro", img.width - 20, croppedHeight - 15);
      
      // تحويل الكانفاس إلى صورة للعرض
      const finalImageUrl = canvas.toDataURL("image/png");
      
      removeTypingIndicator();
      addImageToChat(finalImageUrl, canvas);
      
      // تحرير الذاكرة
      URL.revokeObjectURL(img.src);
      
    } catch (error) {
      console.error("Error generating image:", error);
      removeTypingIndicator();
      const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
      const chatAssistant = t ? t.chatAssistant : null;
      addBotMessage(chatAssistant ? chatAssistant.errorGenerating : "عذراً، حدث خطأ أثناء إنشاء التصميم. يرجى المحاولة مرة أخرى.");
      
      // استعادة النقطة في حالة الخطأ
      if (user) {
        await userPointsFunctions.renewUserCoins(user.uid);
      } else {
        const currentCoins = userPointsFunctions.getVisitorCoins();
        userPointsFunctions.updateVisitorCoins(currentCoins + 1);
      }
    }
  }
  
  // معالجة رد فعل المستخدم على الصورة
  window.handleImageFeedback = function(feedback) {
    const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
    const chatAssistant = t ? t.chatAssistant : null;
    
    if (feedback === 'yes') {
      addBotMessage(chatAssistant ? chatAssistant.likeDesign : "رائع! يسعدني أن التصميم يعجبك. هل هناك أي شيء آخر يمكنني مساعدتك به؟");
      // إعادة تعيين المحادثة
      currentQuestionIndex = 0;
      userAnswers = [];
      generatedPrompt = "";
      // تفعيل الإدخال لسؤال جديد
      userInput.disabled = false;
      sendButton.disabled = false;
      userInput.placeholder = chatAssistant ? chatAssistant.placeholder : "اكتب رسالتك هنا...";
    } else {
      addBotMessage(chatAssistant ? chatAssistant.dislikeDesign : "لا مشكلة! أخبرني ما الذي تريد تعديله في التصميم وسأقوم بإنشاء نسخة جديدة لك.");
      // تفعيل وضع التعديل
      isModificationMode = true;
      // تفعيل الإدخال للتعديلات
      userInput.disabled = false;
      sendButton.disabled = false;
      userInput.placeholder = chatAssistant ? chatAssistant.modifyPlaceholder : "اكتب التعديلات المطلوبة هنا...";
      // التركيز على حقل الإدخال
      userInput.focus();
    }
  };
  
  // إضافة مستمعي الأحداث
  sendButton.addEventListener('click', sendMessage);
  
  userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  // إضافة أنماط CSS للرسالة المتحركة
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInOut {
      0%, 100% { opacity: 0; transform: translateY(10px); }
      10%, 90% { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
  
  // بدء المحادثة عند تحميل الصفحة
  initializeChat();
});