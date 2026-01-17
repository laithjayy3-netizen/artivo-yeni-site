// assets/js/footer.js
// تحميل الفوتر من ملف منفصل
document.addEventListener('DOMContentLoaded', function () {
  fetch('includes/footer.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load footer');
      }
      return response.text();
    })
    .then(html => {
      const footerContainer = document.getElementById('footer-container');
      if (footerContainer) {
        footerContainer.innerHTML = html;
      }
    })
    .catch(error => {
      console.error('Error loading footer:', error);
    });
});
