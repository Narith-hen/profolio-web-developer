AOS.init({ duration: 900, easing: 'ease-out-cubic', once: true, offset: 80 });

const content = window.siteContent || {};
const texts = content.typingTexts || [
  "Junior Web Developer",
  "Full-Stack Enthusiast",
  "HTML - CSS - JavaScript",
  "Python & Flask Developer",
  "Building the future..."
];

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function assetPath(path) {
  if (!path || !String(path).startsWith('assets/')) return path;
  return window.location.pathname.includes('/pages/') ? `../${path}` : path;
}

function detailKeyFromCategory(category) {
  return String(category || '')
    .trim()
    .split(/\s+/)
    .map((word, index) => {
      const lower = word.toLowerCase();
      return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

function renderEducation() {
  const roadmap = document.querySelector('#education .education-roadmap');
  if (!roadmap || !content.education?.length) return;

  roadmap.innerHTML = content.education.map((item, index) => {
    const marker = item.markerImage
      ? `<img src="${escapeHtml(assetPath(item.markerImage))}" alt="${escapeHtml(item.school)} Logo"/>`
      : `<i class="${escapeHtml(item.markerIcon || 'fas fa-graduation-cap')}"></i>`;

    return `
      <div class="education-step" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
        <div class="education-marker">
          ${marker}
        </div>
        <div class="education-card ${item.featured ? 'featured' : ''}">
          <p class="education-date">${escapeHtml(item.date)}</p>
          <h3 class="text-2xl font-bold text-yellow mb-3">${escapeHtml(item.school)}</h3>
          <p class="text-xl font-semibold mb-3">${escapeHtml(item.degree)}</p>
          <p class="leading-7">${escapeHtml(item.description)}</p>
        </div>
      </div>
    `;
  }).join('');
}

function renderActivityDetails() {
  if (!content.activityDetails) return;

  document.querySelectorAll('.activity-tile').forEach((tile) => {
    const key = detailKeyFromCategory(tile.dataset.category);
    if (content.activityDetails[key]) {
      tile.dataset.detail = content.activityDetails[key];
    }
  });
}

function renderActivityCards() {
  const grid = document.getElementById('activity-news-grid');
  if (!grid || !content.activityCards?.length) return;

  grid.innerHTML = content.activityCards.map((card, index) => `
    <article
      class="activity-tile activity-news-card ${card.featured ? 'activity-news-featured' : ''}"
      role="button"
      tabindex="0"
      data-key="${escapeHtml(card.key)}"
      data-category="${escapeHtml(card.category)}"
      data-detail="${escapeHtml(card.description)}"
      data-aos="zoom-in"
      data-aos-delay="${(index + 1) * 80}"
    >
      <img src="${escapeHtml(assetPath(card.image))}" alt="${escapeHtml(card.title)}"/>
      <div class="activity-overlay">
        <span class="activity-news-badge">${escapeHtml(card.category)}</span>
        <h3>${escapeHtml(card.title)}</h3>
      </div>
    </article>
  `).join('');
}

function phoneHref(phone) {
  return `tel:${String(phone || '').replace(/[^\d+]/g, '')}`;
}

function renderReferences() {
  const referencesGrid = document.querySelector('#references .grid');
  if (!referencesGrid || !content.references?.length) return;

  referencesGrid.innerHTML = content.references.map((reference) => `
    <article class="reference-card rounded-2xl text-center">
      <div class="reference-card-inner">
        <div class="reference-card-face reference-card-front p-7">
          <img src="${escapeHtml(assetPath(reference.image || 'assets/images/people/image.png'))}" alt="${escapeHtml(reference.name)}" class="w-28 h-28 rounded-full object-cover mx-auto mb-5 border-4 border-yellow shadow-lg"/>
          <h3 class="text-2xl font-bold text-yellow mb-2">${escapeHtml(reference.name)}</h3>
          <p class="font-semibold mb-5">${escapeHtml(reference.position)}</p>
          <div class="space-y-3 text-left">
            <a href="${escapeHtml(phoneHref(reference.phone))}" class="reference-link">
              <i class="fas fa-phone"></i>
              <span>${escapeHtml(reference.phone)}</span>
            </a>
            <a href="mailto:${escapeHtml(reference.email)}" class="reference-link">
              <i class="fas fa-envelope"></i>
              <span>${escapeHtml(reference.email)}</span>
            </a>
          </div>
        </div>
        <div class="reference-card-face reference-card-back p-7">
          <i class="fas fa-quote-left reference-quote-icon"></i>
          <p class="reference-quote">${escapeHtml(reference.quote)}</p>
          <h3 class="text-xl font-bold text-yellow mt-6">${escapeHtml(reference.name)}</h3>
          <p class="font-semibold">${escapeHtml(reference.position)}</p>
        </div>
      </div>
    </article>
  `).join('');
}

function renderSiteContent() {
  renderEducation();
  renderActivityCards();
  renderActivityDetails();
  renderReferences();
  if (window.AOS?.refreshHard) AOS.refreshHard();
}

renderSiteContent();

let count = 0;
let index = 0;

function type() {
  const typingText = document.getElementById('typing-text');
  if (!typingText) return;

  if (count === texts.length) count = 0;

  const currentText = texts[count];
  const letter = currentText.slice(0, ++index);
  typingText.textContent = letter;

  if (index === currentText.length) {
    setTimeout(() => {
      index = 0;
      count++;
      setTimeout(type, 500);
    }, 2000);
  } else {
    setTimeout(type, 100);
  }
}

window.addEventListener('load', () => setTimeout(type, 800));

function toggleTheme() {
  const body = document.body;
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const icon = toggleBtn.querySelector('i');

  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    body.classList.add('light');
    icon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.remove('light');
    body.classList.add('dark');
    icon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'dark');
  }
}

window.onload = function() {
  const saved = localStorage.getItem('theme');
  const toggleBtn = document.getElementById('theme-toggle');

  if (saved === 'light' && toggleBtn) {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    toggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
  }
};

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

const mobileToggle = document.getElementById('mobile-toggle');
if (mobileToggle) mobileToggle.addEventListener('click', () => {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;

  menu.classList.toggle('hidden');
  menu.classList.toggle('flex');
});

document.querySelectorAll('#mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.add('hidden');
    menu.classList.remove('flex');
  });
});

document.querySelectorAll('.show-more-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const moreText = button.previousElementSibling;
    moreText.classList.toggle('hidden');
    button.textContent = moreText.classList.contains('hidden') ? 'Show more' : 'Show less';
  });
});

const activityModal = document.getElementById('activity-modal');
const activityModalImage = document.getElementById('activity-modal-image');
const activityModalGallery = document.getElementById('activity-modal-gallery');
const activityModalCategory = document.getElementById('activity-modal-category');
const activityModalTitle = document.getElementById('activity-modal-title');
const activityModalMeta = document.getElementById('activity-modal-meta');
const activityModalLocation = document.getElementById('activity-modal-location');
const activityModalTimeline = document.getElementById('activity-modal-timeline');
const activityModalDescription = document.getElementById('activity-modal-description');
const activityModalClose = document.getElementById('activity-modal-close');

function closeActivityModal() {
  if (!activityModal) return;

  activityModal.classList.remove('show');
  activityModal.setAttribute('aria-hidden', 'true');
}

function normalizeActivityImage(image, fallbackAlt) {
  if (typeof image === 'string') {
    return { src: assetPath(image), alt: fallbackAlt };
  }

  return {
    src: assetPath(image?.src || ''),
    alt: image?.alt || fallbackAlt
  };
}

function getActivityImages(tile, title) {
  const key = tile.dataset.key || detailKeyFromCategory(tile.dataset.category);
  const galleryImages = content.activityImages?.[key];

  if (galleryImages?.length) {
    return galleryImages
      .map((image) => normalizeActivityImage(image, title))
      .filter((image) => image.src);
  }

  const image = tile.querySelector('img');
  if (!image) return [];

  return [{
    src: image.getAttribute('src'),
    alt: image.getAttribute('alt') || title
  }];
}

function setActivityModalImage(image) {
  if (!activityModalImage) return;

  activityModalImage.src = image.src;
  activityModalImage.alt = image.alt;
  activityModalImage.classList.remove('hidden');
}

function renderActivityModalGallery(images) {
  if (!activityModalGallery) return;

  activityModalGallery.innerHTML = '';
  activityModalGallery.classList.toggle('hidden', images.length <= 1);

  if (images.length <= 1) return;

  images.forEach((image, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `activity-gallery-thumb${index === 0 ? ' active' : ''}`;
    button.setAttribute('aria-label', `Show activity image ${index + 1}`);

    const thumbnail = document.createElement('img');
    thumbnail.src = image.src;
    thumbnail.alt = image.alt;

    button.appendChild(thumbnail);
    button.addEventListener('click', () => {
      setActivityModalImage(image);
      activityModalGallery.querySelectorAll('.activity-gallery-thumb').forEach((thumb) => {
        thumb.classList.remove('active');
      });
      button.classList.add('active');
    });

    activityModalGallery.appendChild(button);
  });
}

function setActivityModalMeta(location, timeline) {
  if (!activityModalMeta || !activityModalLocation || !activityModalTimeline) return;

  activityModalLocation.textContent = location || '';
  activityModalTimeline.textContent = timeline || '';
  activityModalLocation.classList.toggle('hidden', !location);
  activityModalTimeline.classList.toggle('hidden', !timeline);
  activityModalMeta.classList.toggle('hidden', !location && !timeline);
}

function openActivityModal(tile) {
  if (!activityModal || !activityModalTitle || !activityModalDescription || !activityModalCategory) return;

  const key = tile.dataset.key || detailKeyFromCategory(tile.dataset.category);
  const card = content.activityCards?.find((item) => item.key === key) || {};
  const meta = content.activityMeta?.[key] || card;
  const title = meta.title || tile.querySelector('h3')?.textContent.trim() || 'Activity Detail';
  const description = meta.description || tile.dataset.detail || tile.querySelector('p:last-child')?.textContent.trim() || '';
  const images = getActivityImages(tile, title);

  activityModalTitle.textContent = title;
  activityModalDescription.textContent = description;
  activityModalCategory.textContent = tile.dataset.category || 'Activity';
  setActivityModalMeta(meta.location, meta.timeline);

  if (images.length) {
    setActivityModalImage(images[0]);
    renderActivityModalGallery(images);
  } else {
    activityModalImage.removeAttribute('src');
    activityModalImage.alt = '';
    activityModalImage.classList.add('hidden');
    activityModalGallery.innerHTML = '';
    activityModalGallery.classList.add('hidden');
  }

  activityModal.classList.add('show');
  activityModal.setAttribute('aria-hidden', 'false');
  activityModalClose?.focus();
}

document.querySelectorAll('.activity-tile').forEach((tile) => {
  tile.addEventListener('click', () => openActivityModal(tile));
  tile.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openActivityModal(tile);
    }
  });
});

if (activityModalClose) activityModalClose.addEventListener('click', closeActivityModal);

if (activityModal) activityModal.addEventListener('click', (event) => {
  if (event.target === activityModal) closeActivityModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && activityModal?.classList.contains('show')) {
    closeActivityModal();
  }
});

if (window.location.search.includes('success')) {
  const successMessage = document.getElementById('success-message');
  if (successMessage) {
    successMessage.classList.add('show');
    setTimeout(() => successMessage.classList.remove('show'), 5000);
  }
}

