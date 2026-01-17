// assets/js/moodboard.js
// منطق عمل أداة توليد مود بورد
document.addEventListener('DOMContentLoaded', function() {
  const imageUpload = document.getElementById('imageUpload');
  const moodDescription = document.getElementById('moodDescription');
  const generateButton = document.getElementById('generateMoodboard');
  const resultsSection = document.getElementById('resultsSection');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const generatedMoodboard = document.getElementById('generatedMoodboard');
  const downloadButton = document.getElementById('downloadMoodboard');
  const regenerateButton = document.getElementById('regenerateMoodboard');
  
  let uploadedImages = [];
  
  // معالجة تحميل الصور
  imageUpload.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    
    if (files.length > 10) {
      alert('يمكنك تحميل أقصى 10 صور فقط.');
      return;
    }
    
    uploadedImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    
    displayUploadedImages();
  });
  
  // عرض الصور المرفوعة
  function displayUploadedImages() {
    const imagesPreview = document.getElementById('imagesPreview');
    imagesPreview.innerHTML = '';
    
    uploadedImages.forEach((image, index) => {
      const imageItem = document.createElement('div');
      imageItem.className = 'image-item';
      
      imageItem.innerHTML = `
        <img src="${image.url}" alt="${image.name}">
        <button class="image-remove" onclick="removeImage(${index})">
          <i class="fas fa-times"></i>
        </button>
      `;
      
      imagesPreview.appendChild(imageItem);
    });
  }
  
  // إزالة صورة معينة
  window.removeImage = function(index) {
    uploadedImages.splice(index, 1);
    displayUploadedImages();
  };
  
  // توليد مود بورد
  generateButton.addEventListener('click', async function() {
    if (uploadedImages.length === 0) {
      alert('يرجى تحميل صور على الأقل قبل التوليد.');
      return;
    }
    
    // إظهار قسم النتائج والتوقف
    resultsSection.style.display = 'flex';
    loadingSpinner.style.display = 'flex';
    generatedMoodboard.style.display = 'none';
    
    try {
      // التحقق من النقاط
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
            const moodboard = t ? t.moodboard : null;
            addBotMessage(moodboard ? moodboard.noCoins : "عذراً، لقد استنفدت نقاطك المجانية لهذا الشهر. يمكنك طلب المزيد من النقاط عبر التواصل معنا على واتساب.");
            return;
          }
        } catch (error) {
          console.error("Error checking coins:", error);
          const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
          const moodboard = t ? t.moodboard : null;
          addBotMessage(moodboard ? moodboard.errorCheckingCoins : "حدث خطأ في التحقق من النقاط. يرجى المحاولة مرة أخرى.");
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
          const moodboard = t ? t.moodboard : null;
          addBotMessage(moodboard ? moodboard.noCoinsVisitor : "عذراً، لقد استنفدت نقاطك المجانية. سجل دخولك للحصول على 8 نقاط مجانية كل شهر!");
          return;
        }
      }
      
      if (!hasEnoughCoins) return;
      
      // جمع البيانات
      const description = moodDescription.value.trim() || 'مود بورد احترافي';
      const images = uploadedImages.map(img => img.url).join(',');
      
      // إظهار مؤشر التحميل
      loadingSpinner.style.display = 'flex';
      
      try {
        // استدعاء API لـ Replicate
        const apiUrl = `https://api.replicate.com/v1/predictions`;
        const headers = {
          'Authorization': `Bearer r8_XMSlU2VXMn1xHPT08yUWCoucR28qMzt0TxJdd`,
          'Content-Type': 'application/json'
        };
        
        const body = JSON.stringify({
          version: "stable-diffusion-v1-5",
          input: {
            prompt: `Generate a professional mood board collage with the following images: ${images}. The mood should be ${description}`,
            num_inference_steps: 50,
            guidance_scale: 7.5,
            seed: Math.floor(Math.random() * 1000000)
          }
        });
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: headers,
          body: body
        });
        
        if (!response.ok) {
          throw new Error('Failed to generate mood board');
        }
        
        const prediction = await response.json();
        
        // التحقق من حالة التنبؤ
        const checkPredictionStatus = setInterval(async () => {
          const statusResponse = await fetch(`${apiUrl}/${prediction.id}`, {
            headers: headers
          });
          
          const statusData = await statusResponse.json();
          
          if (statusData.status === 'succeeded') {
            clearInterval(checkPredictionStatus);
            
            // إظهار النتيجة
            loadingSpinner.style.display = 'none';
            generatedMoodboard.style.display = 'grid';
            
            // عرض الصور النهائية
            statusData.output.forEach((output, index) => {
              const moodboardItem = document.createElement('div');
              moodboardItem.className = 'moodboard-item';
              
              moodboardItem.innerHTML = `
                <img src="${output}" alt="مود بورد ${index + 1}">
              `;
              
              generatedMoodboard.appendChild(moodboardItem);
            });
            
            // تفعيل أزرار التنزيل والإعادة
            downloadButton.style.display = 'inline-flex';
            regenerateButton.style.display = 'inline-flex';
            
          } else if (statusData.status === 'failed') {
            clearInterval(checkPredictionStatus);
            loadingSpinner.style.display = 'none';
            const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
            const moodboard = t ? t.moodboard : null;
            addBotMessage(moodboard ? moodboard.errorGenerating : "عذراً، حدث خطأ أثناء توليد مود بورد. يرجى المحاولة مرة أخرى.");
            
            // استعادة النقطة في حالة الخطأ
            if (user) {
              await userPointsFunctions.renewUserCoins(user.uid);
            } else {
              const currentCoins = userPointsFunctions.getVisitorCoins();
              userPointsFunctions.updateVisitorCoins(currentCoins + 1);
            }
          }
        }, 2000);
        
      } catch (error) {
        console.error("Error generating mood board:", error);
        loadingSpinner.style.display = 'none';
        const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
        const moodboard = t ? t.moodboard : null;
        addBotMessage(moodboard ? moodboard.errorGenerating : "عذراً، حدث خطأ أثناء توليد مود بورد. يرجى المحاولة مرة أخرى.");
        
        // استعادة النقطة في حالة الخطأ
        if (user) {
          await userPointsFunctions.renewUserCoins(user.uid);
        } else {
          const currentCoins = userPointsFunctions.getVisitorCoins();
          userPointsFunctions.updateVisitorCoins(currentCoins + 1);
        }
      }
      
    } catch (error) {
      console.error("Error processing request:", error);
      loadingSpinner.style.display = 'none';
      const t = window.languageFunctions ? window.languageFunctions.getTranslations() : null;
      const moodboard = t ? t.moodboard : null;
      addBotMessage(moodboard ? moodboard.errorProcessing : "عذراً، حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى.");
    }
  });
  
  // تنزيل مود بورد
  downloadButton.addEventListener('click', function() {
    // في هذا المثال، سنقوم بدمج الصور النهائية في ملف واحد
    // في تطبيق حقيقي، قد تحتاج إلى تنفيذ خوارزمية دمج الصور
    
    const moodboardItems = generatedMoodboard.querySelectorAll('.moodboard-item img');
    if (moodboardItems.length === 0) {
      alert('لا توجد مود بورد تم توليدها.');
      return;
    }
    
    // في هذا المثال، سنقوم بإنشاء صورة عشوائية كدليل
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // حساب حجم القماش
    const maxWidth = 800;
    const maxHeight = 600;
    const spacing = 10;
    
    // حساب عدد الصفوف والأعمدة
    const cols = Math.ceil(Math.sqrt(moodboardItems.length));
    const rows = Math.ceil(moodboardItems.length / cols);
    
    // حساب عرض وارتفاع كل صورة
    const itemWidth = (maxWidth - (cols + 1) * spacing) / cols;
    const itemHeight = (maxHeight - (rows + 1) * spacing) / rows;
    
    canvas.width = maxWidth;
    canvas.height = maxHeight;
    
    // رسم الصور على القماش
    let index = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (index < moodboardItems.length) {
          const img = moodboardItems[index];
          const x = col * (itemWidth + spacing) + spacing;
          const y = row * (itemHeight + spacing) + spacing;
          
          // تحميل الصورة
          const tempImg = new Image();
          tempImg.crossOrigin = 'anonymous';
          tempImg.src = img.src;
          
          tempImg.onload = function() {
            ctx.drawImage(tempImg, x, y, itemWidth, itemHeight);
          };
          
          index++;
        }
      }
    }
    
    // تحويل القماش إلى صورة للتنزيل
    canvas.toBlob(function(blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'moodboard-artivo.png';
      link.href = url;
      link.click();
      
      // تحرير الذاكرة
      URL.revokeObjectURL(url);
    }, 'image/png');
  });
  
  // إعادة توليد مود بورد
  regenerateButton.addEventListener('click', function() {
    // إعادة تعيين المتغيرات
    uploadedImages = [];
    document.getElementById('imagesPreview').innerHTML = '';
    document.getElementById('moodDescription').value = '';
    
    // إخفاء النتائج وإعادة العرض
    resultsSection.style.display = 'none';
    generatedMoodboard.innerHTML = '';
    downloadButton.style.display = 'none';
    regenerateButton.style.display = 'none';
  });
});