// script.js
const franchiseForm = document.getElementById('franchiseForm');
franchiseForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const form = e.target;

  // simulate form sending
  setTimeout(() => {
    form.reset();
    document.getElementById('thankYouMessage').classList.remove('hidden');
  }, 500);
});

// scroll to thank you message
const thankYou = document.getElementById('thankYouMessage');
const observer = new MutationObserver(() => {
  if (!thankYou.classList.contains('hidden')) {
    thankYou.scrollIntoView({ behavior: 'smooth' });
  }
});
observer.observe(thankYou, { attributes: true });

// Sequential animation for brand cards
window.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.brand-card');
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('fade-in');
    }, index * 200);
  });
});

// Modal functionality
const modal = document.getElementById('brandModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalImages = document.getElementById('modalImages');
const closeBtn = document.querySelector('.modal-close');

// Click on brand cards to open modal
document.querySelectorAll('.brand-card').forEach(card => {
  card.addEventListener('click', () => {
    // Set title and description
    modalTitle.innerText = card.querySelector('h3').innerText;
    modalDesc.innerText = card.querySelector('p').innerText;
    
    // Build image gallery, ensuring correct path
    const srcList = card.dataset.images.split(',').map(s => s.trim());
    modalImages.innerHTML = srcList.map(src => {
      // If path starts with 'http' or 'images/', use as-is, otherwise prepend 'images/'
      const url = src.match(/^(https?:)?\/\//) || src.startsWith('images/') ? src : `images/${src}`;
      return `<img src="${url}" alt="${modalTitle.innerText}">`;
    }).join('');

    // Show modal
    modal.classList.remove('hidden');
  });
});

// Close modal on button click or outside click
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.add('hidden');
});
