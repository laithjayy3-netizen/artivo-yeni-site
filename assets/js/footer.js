// assets/js/footer.js
// تحميل الفوتر من ملف منفصل
document.addEventListener('DOMContentLoaded', function() {
  fetch('../includes/footer.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer-container').innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading footer:', error);
    });
});