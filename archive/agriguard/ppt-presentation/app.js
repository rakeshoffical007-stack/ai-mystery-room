// Modern Presentation Engine Logic
let currentIndex = 0;
let laserActive = false;
let presenterModeActive = false;
let currentTheme = 'theme-glass';

// DOM Elements
const slideStage = document.getElementById('slide-stage');
const slideContentWrapper = document.getElementById('slide-content-wrapper');
const slideCounter = document.getElementById('slide-counter');
const progressBarFill = document.getElementById('progress-bar-fill');
const laserPointer = document.getElementById('laser-pointer');
const presenterPanel = document.getElementById('presenter-panel');
const notesText = document.getElementById('notes-text');
const gridModal = document.getElementById('grid-modal');
const slideGridSorter = document.getElementById('slide-grid-sorter');
const themeSelect = document.getElementById('theme-select');

// Initialize Presentation App
document.addEventListener('DOMContentLoaded', () => {
  renderSlide(currentIndex);
  setupEventListeners();
  buildGridThumbnails();
});

// Render Slide Content based on Slide Type
function renderSlide(index) {
  if (index < 0 || index >= initialSlidesData.length) return;
  currentIndex = index;

  const slide = initialSlidesData[currentIndex];

  // Update Progress & Counter
  slideCounter.textContent = `${currentIndex + 1} / ${initialSlidesData.length}`;
  progressBarFill.style.width = `${((currentIndex + 1) / initialSlidesData.length) * 100}%`;

  // Update Speaker Notes
  notesText.textContent = slide.notes || "No speaker notes recorded for this slide.";

  // Transition Out
  slideContentWrapper.classList.add('slide-exit-left');

  setTimeout(() => {
    slideContentWrapper.innerHTML = generateSlideHTML(slide);
    slideContentWrapper.className = 'slide-content-wrapper slide-enter-right';

    // Force Reflow
    void slideContentWrapper.offsetWidth;
    slideContentWrapper.classList.remove('slide-enter-right');
  }, 180);
}

// Generate Slide HTML Templates
function generateSlideHTML(slide) {
  let innerHTML = '';
  
  if (slide.image) {
    innerHTML += `<div class="slide-with-image">`;
    innerHTML += `<div class="slide-text-side">`;
  } else {
    innerHTML += `<div class="slide-full-text">`;
  }

  innerHTML += `<div class="slide-badge">${slide.badge || 'PRESENTATION'}</div>`;
  innerHTML += `<h2 class="slide-title">${slide.title}</h2>`;
  if (slide.subtitle) {
    innerHTML += `<p class="slide-subtitle">${slide.subtitle}</p>`;
  }

  switch (slide.type) {
    case 'hero':
      if (slide.bullets) {
        innerHTML += `<ul class="bullets-list">`;
        slide.bullets.forEach(b => {
          innerHTML += `<li>${b}</li>`;
        });
        innerHTML += `</ul>`;
      }
      break;

    case 'grid':
      if (slide.cards) {
        innerHTML += `<div class="grid-container">`;
        slide.cards.forEach(c => {
          innerHTML += `
            <div class="feature-card">
              <div class="card-icon">${c.icon}</div>
              <h3 class="card-title">${c.title}</h3>
              <p class="card-desc">${c.desc}</p>
            </div>
          `;
        });
        innerHTML += `</div>`;
      }
      break;

    case 'stats':
      if (slide.stats) {
        innerHTML += `<div class="stats-grid">`;
        slide.stats.forEach(s => {
          innerHTML += `
            <div class="stat-box">
              <div class="stat-value">${s.value}</div>
              <div class="stat-label">${s.label}</div>
              <div class="stat-note">${s.note}</div>
            </div>
          `;
        });
        innerHTML += `</div>`;
      }
      break;

    case 'split':
      if (slide.items) {
        innerHTML += `<div class="roadmap-timeline">`;
        slide.items.forEach(item => {
          innerHTML += `
            <div class="timeline-item">
              <div class="phase-tag">${item.phase}</div>
              <div class="item-body">
                <h4>${item.title}</h4>
                <p>${item.desc}</p>
              </div>
            </div>
          `;
        });
        innerHTML += `</div>`;
      }
      break;
  }

  innerHTML += `</div>`; // Close text-side

  if (slide.image) {
    innerHTML += `
      <div class="slide-image-side">
        <img src="${slide.image}" alt="${slide.title}" class="slide-hero-img" />
      </div>
    `;
    innerHTML += `</div>`; // Close slide-with-image
  }

  return innerHTML;
}

// Helper: Escape HTML strings for code blocks
function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Next / Previous Navigation
function nextSlide() {
  if (currentIndex < initialSlidesData.length - 1) {
    renderSlide(currentIndex + 1);
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    renderSlide(currentIndex - 1);
  }
}

// Laser Pointer Control
function toggleLaser() {
  laserActive = !laserActive;
  const laserBtn = document.getElementById('btn-laser');
  if (laserActive) {
    laserBtn.classList.add('active');
    laserPointer.style.display = 'block';
  } else {
    laserBtn.classList.remove('active');
    laserPointer.style.display = 'none';
  }
}

// Presenter View Toggle
function togglePresenter() {
  presenterModeActive = !presenterModeActive;
  const presenterBtn = document.getElementById('btn-presenter');
  if (presenterModeActive) {
    presenterBtn.classList.add('active');
    presenterPanel.classList.add('show');
  } else {
    presenterBtn.classList.remove('active');
    presenterPanel.classList.remove('show');
  }
}

// Fullscreen Control
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// Theme Change Handler
function changeTheme(themeName) {
  document.body.setAttribute('data-theme', themeName);
  currentTheme = themeName;
}

// Build Slide Grid Thumbnails
function buildGridThumbnails() {
  slideGridSorter.innerHTML = '';
  initialSlidesData.forEach((slide, idx) => {
    const thumb = document.createElement('div');
    thumb.className = `grid-thumb ${idx === currentIndex ? 'active' : ''}`;
    thumb.innerHTML = `
      <div class="thumb-num">Slide ${idx + 1}</div>
      <div class="thumb-title">${slide.title}</div>
      <div class="kbd-hint">${slide.type.toUpperCase()}</div>
    `;
    thumb.onclick = () => {
      renderSlide(idx);
      toggleGridModal();
    };
    slideGridSorter.appendChild(thumb);
  });
}

function toggleGridModal() {
  buildGridThumbnails();
  gridModal.classList.toggle('active');
}

// Event Listeners Setup
function setupEventListeners() {
  // Navigation Buttons
  document.getElementById('btn-next').onclick = nextSlide;
  document.getElementById('btn-prev').onclick = prevSlide;
  document.getElementById('btn-laser').onclick = toggleLaser;
  document.getElementById('btn-presenter').onclick = togglePresenter;
  document.getElementById('btn-fullscreen').onclick = toggleFullscreen;
  document.getElementById('btn-grid').onclick = toggleGridModal;
  document.getElementById('btn-close-grid').onclick = toggleGridModal;

  themeSelect.onchange = (e) => changeTheme(e.target.value);

  // Mouse Move for Laser Pointer
  slideStage.addEventListener('mousemove', (e) => {
    if (laserActive) {
      const rect = slideStage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      laserPointer.style.left = `${x}px`;
      laserPointer.style.top = `${y}px`;
    }
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
      case 'PageDown':
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        prevSlide();
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 'g':
      case 'G':
        toggleGridModal();
        break;
      case 'l':
      case 'L':
        toggleLaser();
        break;
      case 'p':
      case 'P':
        togglePresenter();
        break;
      case 'Escape':
        if (gridModal.classList.contains('active')) {
          toggleGridModal();
        }
        break;
    }
  });
}
