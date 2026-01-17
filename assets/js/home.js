// assets/js/home.js
// منطق خاص بالصفحة الرئيسية
document.addEventListener('DOMContentLoaded', function() {
  // زر البدء في قسم الهيرو
  const getStartedBtn = document.getElementById('getStartedBtn');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', function() {
      document.querySelector('.tools-section').scrollIntoView({ 
        behavior: 'smooth' 
      });
    });
  }
  
  // روابط أدوات الذكاء الاصطناعي
  document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', function() {
      const toolLink = this.querySelector('.tool-link');
      if (toolLink) {
        window.location.href = toolLink.getAttribute('href');
      }
    });
  });
});