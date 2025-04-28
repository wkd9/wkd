// script.js

// URL of the Render-hosted backend endpoint
const API_URL = 'https://wkd-backend.onrender.com/send-email';

const franchiseForm = document.getElementById('franchiseForm');
const thankYouMessage = document.getElementById('thankYouMessage');

franchiseForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Prepare form data
  const formData = new FormData(franchiseForm);

  // Send to backend
  fetch(API_URL, {
    method: 'POST',
    body: formData
  })
    .then(async res => {
      const data = await res.json();
      if (data.message) {
        franchiseForm.reset();
        thankYouMessage.classList.remove('hidden');
      } else {
        alert(data.error || 'حدث خطأ أثناء الإرسال');
      }
    })
    .catch(err => {
      console.error('Fetch error:', err);
      alert('تعذر إرسال الطلب، حاول مرة أخرى لاحقًا.');
    });
});

// scroll to thank you message
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
