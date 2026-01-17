// assets/js/languages.js
// نظام اللغات
document.addEventListener('DOMContentLoaded', function() {
  // كائن الترجمات
  const translations = {
    ar: {
      // الصفحة الرئيسية
      home: {
        title: "مرحباً بك في Artivo AI",
        subtitle: "منصة التصميم بالذكاء الاصطناعي التي تحول أفكارك إلى واقع ملموس",
        getStarted: "ابدأ الآن",
        toolsTitle: "أدواتنا الذكية",
        tools: {
          textToImage: {
            title: "توليد الصور من النص",
            desc: "حول أفكارك ونصوصك إلى صور واقعية بجودة عالية باستخدام الذكاء الاصطناعي"
          },
          chatAssistant: {
            title: "المساعد الذكي",
            desc: "محادثة تفاعلية مع مساعد ذكي يساعدك في تصميم المساحات الداخلية والخارجية"
          },
          imageEditor: {
            title: "تعديل الصور الذكي",
            desc: "عدل وصورحسن صورك باستخدام أدوات الذكاء الاصطناعي المتقدمة"
          },
          colorGenerator: {
            title: "مولد الألوان",
            desc: "اكتشف مجموعات ألوان متناسقة لمشاريعك التصميمية بنقرة واحدة"
          },
          graphicDesign: {
            title: "تصميم الجرافيك",
            desc: "أنشئ تصاميم جرافيك احترافية للشعارات والبوسترات والمواد التسويقية"
          },
          threeDDesign: {
            title: "التصميم ثلاثي الأبعاد",
            desc: "صمم نماذج ثلاثية الأبعاد للمباني والأثاث والمساحات الداخلية"
          }
        }
      },
      // الهيدر
      header: {
        tools: "أدواتنا الذكية",
        signIn: "تسجيل الدخول",
        signUp: "إنشاء حساب",
        signOut: "تسجيل الخروج",
        profile: "الملف الشخصي",
        coins: "نقاط",
        visitor: "(زائر)"
      },
      // الملف الشخصي
      profile: {
        title: "الملف الشخصي",
        accountSettings: "إعدادات الحساب",
        fullName: "الاسم الكامل",
        phone: "رقم الهاتف",
        email: "البريد الإلكتروني",
        saveChanges: "حفظ التغييرات",
        activityHistory: "سجل النشاط",
        activityDescription: "عرض جميع التصميمات والأنشطة الأخيرة على حسابك",
        showActivity: "عرض سجل النشاط",
        recentDesigns: "آخر 10 تصميمات",
        renewalLabel: "تجديد النقاط خلال:",
        days: "أيام",
        hours: "ساعات",
        designs: "تصميم",
        coins: "نقاط"
      },
      // توليد الصور
      textToImage: {
        title: "توليد الصور من النص",
        subtitle: "صمم رؤيتك بالكلمات. اكتب وصفاً دقيقاً للتصميم الذي تريده وسيقوم الذكاء الاصطناعي بتحويل أفكارك إلى واقع مذهل.",
        placeholder: "مثال: غرفة نوم عصرية بإضاءة هادئة، أريكة فخمة في صالة معيشة واسعة...",
        generate: "إنشاء التصميم",
        loading: "يتم الآن توليد التصميم، يرجى الانتظار...",
        download: "تحميل الصورة",
        charsRemaining: "حرف متبقي",
        imageError: "حدث خطأ أثناء إنشاء التصميم. يرجى المحاولة مرة أخرى.",
        downloadSuccess: "تم التحميل بنجاح"
      },
      // المساعد الذكي
      chatAssistant: {
        title: "المساعد الذكي للمصممين",
        subtitle: "تحدث مع مساعدنا الذكي للحصول على تصميمات معمارية مخصصة تناسب احتياجاتك",
        welcomeMessage: "مرحباً! أنا المساعد الذكي للمصممين. سأساعدك في تصميم الغرفة المثالية لك. لنبدأ ببعض الأسئلة لفهم احتياجاتك بشكل أفضل.",
        generatingDesign: "شكراً لك على جميع المعلومات! الآن سأقوم بإنشاء التصميم المثالي لك بناءً على إجاباتك...",
        designReady: "هذا هو التصميم المقترح بناءً على طلبك:",
        designQuestion: "هل أعجبك التصميم أم تريد التعديل عليه؟",
        likeDesign: "رائع! يسعدني أن التصميم يعجبك. هل هناك أي شيء آخر يمكنني مساعدتك به؟",
        dislikeDesign: "لا مشكلة! أخبرني ما الذي تريد تعديله في التصميم وسأقوم بإنشاء نسخة جديدة لك.",
        downloadButton: "تحميل الصورة",
        downloadSuccess: "تم تحميل الصورة بنجاح",
        yesButton: "نعم",
        noButton: "لا",
        noCoins: "عذراً، لقد استنفدت نقاطك المجانية لهذا الشهر. يمكنك طلب المزيد من النقاط عبر التواصل معنا على واتساب.",
        noCoinsVisitor: "عذراً، لقد استنفدت نقاطك المجانية. سجل دخولك للحصول على 8 نقاط مجانية كل شهر!",
        errorGenerating: "عذراً، حدث خطأ أثناء إنشاء التصميم. يرجى المحاولة مرة أخرى.",
        errorCheckingCoins: "حدث خطأ في التحقق من النقاط. يرجى المحاولة مرة أخرى.",
        placeholder: "اكتب رسالتك هنا...",
        sendButton: "إرسال",
        modifyPlaceholder: "اكتب التعديلات المطلوبة هنا...",
        // الأسئلة التي سيطرحها المساعد
        questions: [
          "ما نوع الغرفة التي تريد تصميمها؟ (غرفة نوم، صالة معيشة، مطبخ، حمام، مكتب، إلخ)",
          "ما هي الأبعاد التقريبية للغرفة؟ (الطول × العرض × الارتفاع)",
          "أين توجد النوافذ في الغرفة؟ (عددها ومواقعها)",
          "أين توجد الأبواب في الغرفة؟",
          "ما هو الأسلوب التصميمي المفضل لديك؟ (حديث، كلاسيكي، صناعي، بوهيمي، إلخ)",
          "ما هي الألوان المفضلة لديك؟",
          "ما نوع الإضاءة التي تفضلها؟ (دافئة، باردة، طبيعية)",
          "هل هناك أثاث محدد تريد تضمينه؟",
          "ما هي ميزانية التصميم التقريبية؟",
          "هل هناك أي متطلبات خاصة أخرى؟"
        ]
      }
    },
    en: {
      // Home page
      home: {
        title: "Welcome to Artivo AI",
        subtitle: "AI design platform that transforms your ideas into tangible reality",
        getStarted: "Get Started",
        toolsTitle: "Our Smart Tools",
        tools: {
          textToImage: {
            title: "Text to Image Generation",
            desc: "Transform your ideas and texts into realistic images with high quality using AI"
          },
          chatAssistant: {
            title: "Smart Assistant",
            desc: "Interactive conversation with a smart assistant that helps you design interior and exterior spaces"
          },
          imageEditor: {
            title: "Smart Image Editor",
            desc: "Edit and enhance your photos using advanced AI tools"
          },
          colorGenerator: {
            title: "Color Generator",
            desc: "Discover harmonious color palettes for your design projects with one click"
          },
          graphicDesign: {
            title: "Graphic Design",
            desc: "Create professional graphic designs for logos, posters and marketing materials"
          },
          threeDDesign: {
            title: "3D Design",
            desc: "Design 3D models for buildings, furniture and interior spaces"
          }
        }
      },
      // Header
      header: {
        tools: "Our Smart Tools",
        signIn: "Sign In",
        signUp: "Sign Up",
        signOut: "Sign Out",
        profile: "Profile",
        coins: "Coins",
        visitor: "(Visitor)"
      },
      // Profile
      profile: {
        title: "Profile",
        accountSettings: "Account Settings",
        fullName: "Full Name",
        phone: "Phone Number",
        email: "Email",
        saveChanges: "Save Changes",
        activityHistory: "Activity History",
        activityDescription: "View all your recent designs and activities on your account",
        showActivity: "View Activity History",
        recentDesigns: "Last 10 Designs",
        renewalLabel: "Points renewal in:",
        days: "days",
        hours: "hours",
        designs: "Designs",
        coins: "Coins"
      },
      // Text to Image
      textToImage: {
        title: "Text to Image Generation",
        subtitle: "Design your vision with words. Write a detailed description of the design you want and AI will turn your ideas into stunning reality.",
        placeholder: "Example: Modern bedroom with soft lighting, luxurious sofa in a spacious living room...",
        generate: "Generate Design",
        loading: "Generating your design, please wait...",
        download: "Download Image",
        charsRemaining: "characters remaining",
        imageError: "Error generating design. Please try again.",
        downloadSuccess: "Download successful"
      },
      // Chat Assistant
      chatAssistant: {
        title: "Smart Assistant for Designers",
        subtitle: "Chat with our smart assistant to get customized architectural designs that suit your needs",
        welcomeMessage: "Hello! I'm the smart assistant for designers. I'll help you design the perfect room for you. Let's start with some questions to better understand your needs.",
        generatingDesign: "Thank you for all the information! Now I will create the perfect design for you based on your answers...",
        designReady: "This is the proposed design based on your request:",
        designQuestion: "Do you like the design or would you like to modify it?",
        likeDesign: "Great! I'm glad you like the design. Is there anything else I can help you with?",
        dislikeDesign: "No problem! Tell me what you want to modify in the design and I'll create a new version for you.",
        downloadButton: "Download Image",
        downloadSuccess: "Image downloaded successfully",
        yesButton: "Yes",
        noButton: "No",
        noCoins: "Sorry, you have used up your free coins for this month. You can request more coins by contacting us on WhatsApp.",
        noCoinsVisitor: "Sorry, you have used up your free coins. Log in to get 8 free coins every month!",
        errorGenerating: "Sorry, an error occurred while generating the design. Please try again.",
        errorCheckingCoins: "Error checking coins. Please try again.",
        placeholder: "Type your message here...",
        sendButton: "Send",
        modifyPlaceholder: "Type the required modifications here...",
        // Questions the assistant will ask
        questions: [
          "What type of room do you want to design? (bedroom, living room, kitchen, bathroom, office, etc.)",
          "What are the approximate dimensions of the room? (length × width × height)",
          "Where are the windows located in the room? (number and locations)",
          "Where are the doors located in the room?",
          "What is your preferred design style? (modern, classic, industrial, bohemian, etc.)",
          "What are your favorite colors?",
          "What type of lighting do you prefer? (warm, cool, natural)",
          "Is there specific furniture you want to include?",
          "What is your approximate design budget?",
          "Are there any other special requirements?"
        ]
      }
    },
    tr: {
      // Ana sayfa
      home: {
        title: "Artivo AI'ye Hoş Geldiniz",
        subtitle: "Fikirlerinizi somut gerçekliğe dönüştüren AI tasarım platformu",
        getStarted: "Başlayın",
        toolsTitle: "Akıllı Araçlarımız",
        tools: {
          textToImage: {
            title: "Metinden Görsel Üretme",
            desc: "Fikirlerinizi ve metinlerinizi yüksek kalitede AI kullanarak gerçekçi görüntülere dönüştürün"
          },
          chatAssistant: {
            title: "Akıllı Asistan",
            desc: "İç ve dış mekan tasarlamanıza yardımcı olan akıllı bir asistanla etkileşimli konuşma"
          },
          imageEditor: {
            title: "Akıllı Görüntü Düzenleyici",
            desc: "Gelişmiş AI araçlarını kullanarak fotoğraflarınızı düzenleyin ve geliştirin"
          },
          colorGenerator: {
            title: "Renk Üretici",
            desc: "Tasarım projeleriniz için uyumlu renk paletlerini tek tıkla keşfedin"
          },
          graphicDesign: {
            title: "Grafik Tasarım",
            desc: "Logolar, posterler ve pazarlama materyalleri için profesyonel grafik tasarımları oluşturun"
          },
          threeDDesign: {
            title: "3D Tasarım",
            desc: "Binalar, mobilya ve iç mekanlar için 3D modeller tasarlayın"
          }
        }
      },
      // Header
      header: {
        tools: "Akıllı Araçlarımız",
        signIn: "Giriş Yap",
        signUp: "Kayıt Ol",
        signOut: "Çıkış Yap",
        profile: "Profil",
        coins: "Jetonlar",
        visitor: "(Ziyaretçi)"
      },
      // Profil
      profile: {
        title: "Profil",
        accountSettings: "Hesap Ayarları",
        fullName: "Tam Ad",
        phone: "Telefon Numarası",
        email: "E-posta",
        saveChanges: "Değişiklikleri Kaydet",
        activityHistory: "Etkinlik Geçmişi",
        activityDescription: "Hesabınızdaki tüm son tasarımları ve etkinlikleri görüntüleyin",
        showActivity: "Etkinlik Geçmişini Görüntüle",
        recentDesigns: "Son 10 Tasarım",
        renewalLabel: "Jeton yenileme:",
        days: "gün",
        hours: "saat",
        designs: "Tasarım",
        coins: "Jetonlar"
      },
      // Metinden Görsel
      textToImage: {
        title: "Metinden Görsel Üretme",
        subtitle: "Vizyonunuzu kelimelerle tasarlayın. İstediğiniz tasarımın detaylı bir açıklamasını yazın ve AI fikirlerinizi çarpıcı bir gerçeğe dönüştürecek.",
        placeholder: "Örnek: Yumuşak aydınlatmalı modern yatak odası, geniş bir oturma odasında lüks koltuk...",
        generate: "Tasarımı Oluştur",
        loading: "Tasarımınız oluşturuluyor, lütfen bekleyin...",
        download: "Görüntüyü İndir",
        charsRemaining: "karakter kaldı",
        imageError: "Tasarım oluşturulurken hata oluştu. Lütfen tekrar deneyin.",
        downloadSuccess: "İndirme başarılı"
      },
      // Sohbet Asistanı
      chatAssistant: {
        title: "Tasarımcılar için Akıllı Asistan",
        subtitle: "İhtiyaçlarınıza uygun özelleştirilmiş mimari tasarımlar elde etmek için akıllı asistanımızla sohbet edin",
        welcomeMessage: "Merhaba! Ben tasarımcılar için akıllı asistanım. İhtiyaçlarınızı daha iyi anlamak için bazı sorularla başlayarak sizin için mükemmel oda tasarımına yardımcı olacağım.",
        generatingDesign: "Tüm bilgileriniz için teşekkürler! Şimdi cevaplarınıza dayanarak sizin için mükemmel tasarımı oluşturacağım...",
        designReady: "İsteğinize dayalı önerilen tasarım şu şekildedir:",
        designQuestion: "Tasarımı beğendiniz mi yoksa değiştirmek mi istiyorsunuz?",
        likeDesign: "Harika! Tasarımı beğenmenize sevindim. Yardımcı olabileceğim başka bir şey var mı?",
        dislikeDesign: "Sorun değil! Tasarımda neyi değiştirmek istediğinizi söyleyin ve sizin için yeni bir versiyon oluşturacağım.",
        downloadButton: "Görüntüyü İndir",
        downloadSuccess: "Görüntü başarıyla indirildi",
        yesButton: "Evet",
        noButton: "Hayır",
        noCoins: "Üzgünüm, bu ay için ücretsiz jetonlarınızı kullandınız. WhatsApp üzerinden bizimle iletişime geçerek daha fazla jeton talep edebilirsiniz.",
        noCoinsVisitor: "Üzgünüm, ücretsiz jetonlarınızı kullandınız. Her ay 8 ücretsiz jeton almak için giriş yapın!",
        errorGenerating: "Üzgünüm, tasarım oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
        errorCheckingCoins: "Jetonlar kontrol edilirken hata oluştu. Lütfen tekrar deneyin.",
        placeholder: "Mesajınızı buraya yazın...",
        sendButton: "Gönder",
        modifyPlaceholder: "Gerekli değişiklikleri buraya yazın...",
        // Asistanın soracağı sorular
        questions: [
          "Ne tür bir oda tasarlamak istiyorsunuz? (yatak odası, oturma odası, mutfak, banyo, ofis vb.)",
          "Odanın yaklaşık boyutları nedir? (uzunluk × genişlik × yükseklik)",
          "Odadaki pencereler nerede bulunuyor? (sayı ve konumlar)",
          "Odadaki kapılar nerede bulunuyor?",
          "Tercih ettiğiniz tasarım stili nedir? (modern, klasik, endüstriyel, bohemyan vb.)",
          "En sevdiğiniz renkler nelerdir?",
          "Ne tür aydınlatma tercih ediyorsunuz? (sıcak, soğuk, doğal)",
          "Dahil etmek istediğiniz belirli mobilyalar var mı?",
          "Yaklaşık tasarım bütçeniz nedir?",
          "Başka özel gereksinimler var mı?"
        ]
      }
    }
  };
  
  // تحديد اللغة الحالية
  let currentLang = localStorage.getItem('selectedLang') || 'en';
  
  // تغيير اللغة
  function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('selectedLang', lang);
    
    // تحديث النصوص في الصفحة
    updatePageText();
    
    // تحديث اتجاه الصفحة
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
  
  // تحديث النصوص في الصفحة
  function updatePageText() {
    const t = translations[currentLang];
    
    // تحديث الصفحة الرئيسية
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
      // عنوان وأزرار الصفحة الرئيسية
      const heroTitle = document.querySelector('.hero-content h1');
      const heroSubtitle = document.querySelector('.hero-content p');
      const getStartedBtn = document.querySelector('#getStartedBtn span');
      const toolsTitle = document.querySelector('.section-title');
      
      if (heroTitle) heroTitle.textContent = t.home.title;
      if (heroSubtitle) heroSubtitle.textContent = t.home.subtitle;
      if (getStartedBtn) getStartedBtn.textContent = t.home.getStarted;
      if (toolsTitle) toolsTitle.textContent = t.home.toolsTitle;
      
      // تحديث أدوات الذكاء الاصطناعي
      const toolCards = document.querySelectorAll('.tool-card');
      const toolKeys = Object.keys(t.home.tools);
      toolCards.forEach((card, index) => {
        if (toolKeys[index]) {
          const tool = t.home.tools[toolKeys[index]];
          const title = card.querySelector('h3');
          const desc = card.querySelector('p');
          
          if (title) title.textContent = tool.title;
          if (desc) desc.textContent = tool.desc;
        }
      });
    }
    
    // تحديث صفحة الملف الشخصي
    if (window.location.pathname.includes('profile.html')) {
      const profileTitle = document.querySelector('h1');
      const accountSettingsTitle = document.querySelector('.section-title');
      const fullNameLabel = document.querySelector('label[for="fullName"]');
      const phoneLabel = document.querySelector('label[for="phone"]');
      const emailLabel = document.querySelector('label[for="email"]');
      const saveChangesBtn = document.querySelector('#accountForm .btn span');
      const activityHistoryTitle = document.querySelectorAll('.section-title')[1];
      const activityDescription = document.querySelector('.section p');
      const showActivityBtn = document.querySelector('#showActivityBtn span');
      const recentDesignsTitle = document.querySelector('.history-title');
      const renewalLabel = document.querySelector('.renewal-label');
      
      if (profileTitle) profileTitle.textContent = t.profile.title;
      if (accountSettingsTitle) accountSettingsTitle.textContent = t.profile.accountSettings;
      if (fullNameLabel) fullNameLabel.textContent = t.profile.fullName;
      if (phoneLabel) phoneLabel.textContent = t.profile.phone;
      if (emailLabel) emailLabel.textContent = t.profile.email;
      if (saveChangesBtn) saveChangesBtn.textContent = t.profile.saveChanges;
      if (activityHistoryTitle) activityHistoryTitle.textContent = t.profile.activityHistory;
      if (activityDescription) activityDescription.textContent = t.profile.activityDescription;
      if (showActivityBtn) showActivityBtn.textContent = t.profile.showActivity;
      if (recentDesignsTitle) recentDesignsTitle.textContent = t.profile.recentDesigns;
      if (renewalLabel) renewalLabel.textContent = t.profile.renewalLabel;
      
      // تحديث تسميات الإحصائيات
      const statLabels = document.querySelectorAll('.stat-label');
      statLabels.forEach(label => {
        if (label.textContent.includes('تصميم') || label.textContent.includes('Designs') || label.textContent.includes('Tasarım')) {
          label.textContent = t.profile.designs;
        }
        if (label.textContent.includes('نقاط') || label.textContent.includes('Coins') || label.textContent.includes('Jetonlar')) {
          label.textContent = t.profile.coins;
        }
      });
    }
    
    // تحديث صفحة توليد الصور
    if (window.location.pathname.includes('text-to-image.html')) {
      const pageTitle = document.querySelector('h1');
      const subtitle = document.querySelector('.subtitle');
      const textarea = document.querySelector('#prompt');
      const generateBtn = document.querySelector('#generateBtn span');
      const loadingText = document.querySelector('#loading p');
      const downloadBtn = document.querySelector('.download-btn');
      const charCount = document.querySelector('.char-count');
      
      if (pageTitle) pageTitle.textContent = t.textToImage.title;
      if (subtitle) subtitle.textContent = t.textToImage.subtitle;
      if (textarea) textarea.placeholder = t.textToImage.placeholder;
      if (generateBtn) generateBtn.textContent = t.textToImage.generate;
      if (loadingText) loadingText.textContent = t.textToImage.loading;
      if (downloadBtn) downloadBtn.innerHTML = `<i class="fas fa-download"></i> ${t.textToImage.download}`;
      if (charCount) {
        const remaining = 800 - textarea.value.length;
        charCount.textContent = `${remaining} ${t.textToImage.charsRemaining}`;
      }
    }
    
    // تحديث صفحة المساعد الذكي
    if (window.location.pathname.includes('chat-assistant.html')) {
      const pageTitle = document.querySelector('h1');
      const subtitle = document.querySelector('.subtitle');
      const userInput = document.querySelector('#userInput');
      const sendButton = document.querySelector('#sendButton span');
      
      if (pageTitle) pageTitle.textContent = t.chatAssistant.title;
      if (subtitle) subtitle.textContent = t.chatAssistant.subtitle;
      if (userInput) userInput.placeholder = t.chatAssistant.placeholder;
      if (sendButton) sendButton.textContent = t.chatAssistant.sendButton;
    }
    
    // تحديث الهيدر
    const toolsBtn = document.querySelector('.tools-btn span');
    const signInBtn = document.querySelector('#signInButton span');
    const signUpBtn = document.querySelector('#signUpButton span');
    const signOutBtn = document.querySelector('#signOutButton span');
    const profileText = document.querySelector('#userName');
    const visitorText = document.querySelector('#visitorText');
    
    if (toolsBtn) toolsBtn.textContent = t.header.tools;
    if (signInBtn) signInBtn.textContent = t.header.signIn;
    if (signUpBtn) signUpBtn.textContent = t.header.signUp;
    if (signOutBtn) signOutBtn.textContent = t.header.signOut;
    if (profileText) profileText.textContent = t.header.profile;
    if (visitorText) visitorText.textContent = t.header.visitor;
  }
  
  // تحديث النصوص عند التحميل
  updatePageText();
  
  // جعل الدوال متاحة عالمياً
  window.languageFunctions = {
    changeLanguage,
    updatePageText,
    getTranslations: () => translations[currentLang],
    getQuestions: () => translations[currentLang].chatAssistant.questions
  };
});