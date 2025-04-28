// script.js

// URL الخاص بـ Render
const API_URL = 'https://wkd-backend.onrender.com/send-email';

const franchiseForm = document.getElementById('franchiseForm');
const thankYouMessage = document.getElementById('thankYouMessage');

// إرسال النموذج
franchiseForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(franchiseForm);
  const submitButton = franchiseForm.querySelector("button[type='submit']");

  submitButton.disabled = true;

  // عرض رسالة جارٍ الإرسال
  thankYouMessage.style.display = "block";
  thankYouMessage.innerText = "🚀 جاري الإرسال...";
  thankYouMessage.style.backgroundColor = "#fff3cd"; // أصفر فاتح
  thankYouMessage.style.color = "#856404";           // بني غامق

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (response.ok) {
      thankYouMessage.innerText = "✅ تم الإرسال بنجاح!";
      thankYouMessage.style.backgroundColor = "#d4edda"; // أخضر فاتح
      thankYouMessage.style.color = "#155724";           // أخضر غامق
      franchiseForm.reset();

      // إعادة تحميل الصفحة بعد 3 ثواني
      setTimeout(() => {
        location.reload();
      }, 3000);
    } else {
      thankYouMessage.innerText = "❌ حدث خطأ أثناء الإرسال: " + (result?.error || "يرجى المحاولة لاحقاً");
      thankYouMessage.style.backgroundColor = "#f8d7da"; // أحمر فاتح
      thankYouMessage.style.color = "#721c24";           // أحمر غامق
    }
  } catch (error) {
    thankYouMessage.innerText = "❌ تعذر الإرسال: " + error.message;
    thankYouMessage.style.backgroundColor = "#f8d7da";
    thankYouMessage.style.color = "#721c24";
  }

  submitButton.disabled = false;
});

// scroll to thank you message عند نجاح الإرسال
const observer = new MutationObserver(() => {
  if (!thankYouMessage.classList.contains('hidden')) {
    thankYouMessage.scrollIntoView({ behavior: 'smooth' });
  }
});
observer.observe(thankYouMessage, { attributes: true });

// Sequential animation for brand cards
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.brand-card').forEach((el, index) => {
    setTimeout(() => el.classList.add('fade-in'), index * 200);
  });
});

// Modal functionality
const modal = document.getElementById('brandModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalImages = document.getElementById('modalImages');
const closeBtn = document.querySelector('.modal-close');

document.querySelectorAll('.brand-card').forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.innerText = card.querySelector('h3').innerText;
    modalDesc.innerText = card.querySelector('p').innerText;

    const srcList = card.dataset.images.split(',').map(s => s.trim());
    modalImages.innerHTML = srcList.map(src => {
      const url = src.startsWith('http') || src.startsWith('images/') ? src : `images/${src}`;
      return `<img src="${url}" alt="${modalTitle.innerText}">`;
    }).join('');

    modal.classList.remove('hidden');
  });
});

closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.add('hidden');
});
