// assets/js/header.js
// تحميل الهيدر من ملف منفصل
document.addEventListener('DOMContentLoaded', function () {
  fetch('includes/header.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load header');
      }
      return response.text();
    })
    .then(html => {
      const headerContainer = document.getElementById('header-container');
      if (headerContainer) {
        headerContainer.innerHTML = html;
      }

      // بعد تحميل الهيدر، قم بتهيئة الأحداث
      initializeHeaderEvents();
      initializeLanguageSelector();

      // إضافة حدث النقر للشعار
      const logo = document.getElementById('logo');
      if (logo) {
        logo.addEventListener('click', function () {
          window.location.href = 'index.html';
        });
      }
    })
    .catch(error => {
      console.error('Error loading header:', error);
    });
});

// تهيئة أحداث الهيدر
function initializeHeaderEvents() {
  // زر القائمة للجوال
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileNav.classList.toggle('show');
    });

    document.addEventListener('click', function (e) {
      if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('show');
      }
    });
  }

  // روابط تسجيل الدخول في القائمة المنسدلة للجوال
  const mobileSignInLink = document.getElementById('mobileSignInLink');
  const mobileSignUpLink = document.getElementById('mobileSignUpLink');
  const mobileSignOutLink = document.getElementById('mobileSignOutLink');
  const signInButton = document.getElementById('signInButton');
  const signUpButton = document.getElementById('signUpButton');
  const signOutButton = document.getElementById('signOutButton');

  if (mobileSignInLink && signInButton) {
    mobileSignInLink.addEventListener('click', function (e) {
      e.preventDefault();
      mobileNav.classList.remove('show');
      signInButton.click();
    });
  }

  if (mobileSignUpLink && signUpButton) {
    mobileSignUpLink.addEventListener('click', function (e) {
      e.preventDefault();
      mobileNav.classList.remove('show');
      signUpButton.click();
    });
  }

  if (mobileSignOutLink && signOutButton) {
    mobileSignOutLink.addEventListener('click', function (e) {
      e.preventDefault();
      mobileNav.classList.remove('show');
      signOutButton.click();
    });
  }

  // نافذة تسجيل الدخول
  const authModal = document.getElementById('authModal');
  const closeAuthModal = document.getElementById('closeAuthModal');
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginError = document.getElementById('loginError');
  const signupError = document.getElementById('signupError');
  const googleLogin = document.getElementById('googleLogin');

  if (closeAuthModal && authModal) {
    closeAuthModal.addEventListener('click', () => {
      authModal.style.display = 'none';
    });

    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) {
        authModal.style.display = 'none';
      }
    });
  }

  if (loginTab && signupTab && loginForm && signupForm) {
    loginTab.addEventListener('click', () => {
      loginTab.classList.add('active');
      signupTab.classList.remove('active');
      loginForm.classList.add('active');
      signupForm.classList.remove('active');
      if (loginError) loginError.style.display = 'none';
      if (signupError) signupError.style.display = 'none';
    });

    signupTab.addEventListener('click', () => {
      signupTab.classList.add('active');
      loginTab.classList.remove('active');
      signupForm.classList.add('active');
      loginForm.classList.remove('active');
      if (loginError) loginError.style.display = 'none';
      if (signupError) signupError.style.display = 'none';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      try {
        await authFunctions.signInWithEmail(email, password);
        if (authModal) authModal.style.display = 'none';
      } catch (error) {
        if (loginError) {
          loginError.textContent = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
          loginError.style.display = 'block';
        }
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;
      const confirmPassword = document.getElementById('signupConfirmPassword').value;

      if (password !== confirmPassword) {
        if (signupError) {
          signupError.textContent = 'كلمات المرور غير متطابقة';
          signupError.style.display = 'block';
        }
        return;
      }

      try {
        await authFunctions.createAccount(email, password);
        if (authModal) authModal.style.display = 'none';
      } catch (error) {
        if (signupError) {
          signupError.textContent = 'حدث خطأ أثناء إنشاء الحساب';
          signupError.style.display = 'block';
        }
      }
    });
  }

  if (googleLogin && authModal) {
    googleLogin.addEventListener('click', async () => {
      try {
        await authFunctions.signInWithGoogle();
        authModal.style.display = 'none';
      } catch (error) {
        if (loginError) {
          loginError.textContent = 'حدث خطأ أثناء تسجيل الدخول';
          loginError.style.display = 'block';
        }
      }
    });
  }

  if (signInButton && authModal) {
    signInButton.addEventListener('click', () => {
      authModal.style.display = 'flex';
      if (loginTab) loginTab.classList.add('active');
      if (signupTab) signupTab.classList.remove('active');
      if (loginForm) loginForm.classList.add('active');
      if (signupForm) signupForm.classList.remove('active');
    });
  }

  if (signOutButton) {
    signOutButton.addEventListener('click', async () => {
      try {
        await authFunctions.signOutUser();
      } catch (error) {
        console.error('Sign out error:', error);
      }
    });
  }
}

// تهيئة محدد اللغات
function initializeLanguageSelector() {
  setTimeout(() => {
    const selectedLanguage = document.getElementById('selectedLanguage');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = document.querySelectorAll('.language-option');

    if (selectedLanguage && languageDropdown) {
      const newSelectedLanguage = selectedLanguage.cloneNode(true);
      selectedLanguage.parentNode.replaceChild(newSelectedLanguage, selectedLanguage);

      function toggleLanguageDropdown(e) {
        e.preventDefault();
        e.stopPropagation();
        closeAllDropdowns();
        languageDropdown.classList.toggle('show');
      }

      function closeLanguageDropdown(e) {
        if (!newSelectedLanguage.contains(e.target)) {
          languageDropdown.classList.remove('show');
        }
      }

      newSelectedLanguage.addEventListener('click', toggleLanguageDropdown);
      document.addEventListener('click', closeLanguageDropdown);

      languageOptions.forEach(option => {
        const newOption = option.cloneNode(true);
        option.parentNode.replaceChild(newOption, option);

        newOption.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          const lang = newOption.getAttribute('data-lang');

          const flagElement = newOption.querySelector('.flag');
          const textElement = newOption.querySelector('span') || newOption;
          const currentFlag = document.getElementById('currentFlag');
          const currentLanguageText = document.getElementById('currentLanguageText');

          if (flagElement && currentFlag) currentFlag.src = flagElement.src;
          if (currentLanguageText) currentLanguageText.textContent = textElement.textContent.trim();

          if (window.languageFunctions?.changeLanguage) {
            window.languageFunctions.changeLanguage(lang);
          }

          languageDropdown.classList.remove('show');
        });
      });
    }

    const mobileLanguageOptions = document.querySelectorAll('.mobile-language-option');
    mobileLanguageOptions.forEach(option => {
      const newOption = option.cloneNode(true);
      option.parentNode.replaceChild(newOption, option);

      newOption.addEventListener('click', function (e) {
        e.preventDefault();
        const lang = newOption.getAttribute('data-lang');

        const flagElement = newOption.querySelector('.flag');
        const textElement = newOption.querySelector('span') || newOption;
        const currentFlag = document.getElementById('currentFlag');
        const currentLanguageText = document.getElementById('currentLanguageText');

        if (flagElement && currentFlag) currentFlag.src = flagElement.src;
        if (currentLanguageText) currentLanguageText.textContent = textElement.textContent.trim();

        if (window.languageFunctions?.changeLanguage) {
          window.languageFunctions.changeLanguage(lang);
        }
      });
    });
  }, 100);
}

// إغلاق جميع القوائم المنسدلة
function closeAllDropdowns() {
  const dropdowns = document.querySelectorAll('.language-dropdown, .tools-dropdown-content');
  dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
}
