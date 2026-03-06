"use strict";

const themeToggle = document.getElementById('theme-toggle');
const shareBtn = document.getElementById('share-audio-btn');
const closeShareModal = document.getElementById('close-share-modal');
const shareModal = document.getElementById('share-modal');
const sharePlatformButtons = document.querySelectorAll('.share-platform-btn');
const cover = document.querySelector('.main-cover');
const audio = document.querySelector('audio');

// --- Тема ---
themeToggle.addEventListener('click', () => {
  const current = document.body.getAttribute('data-theme');
  document.body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  themeToggle.classList.add('active');
  setTimeout(() => themeToggle.classList.remove('active'), 800);
});

// --- Воспроизведение по клику на обложку ---
cover.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(e => console.warn('Автовоспроизведение заблокировано:', e));
  } else {
    audio.pause();
  }
});

// --- Модальное окно «Поделиться аудио» ---
shareBtn.addEventListener('click', () => {
  shareModal.classList.add('open');
  document.body.style.overflow = 'hidden';
});

closeShareModal.addEventListener('click', () => {
  shareModal.classList.remove('open');
  document.body.style.overflow = '';
});

shareModal.addEventListener('click', (e) => {
  if (e.target === shareModal) {
    shareModal.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// --- Поделиться на платформу ---
sharePlatformButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const platform = btn.dataset.platform;
    const url = encodeURIComponent(window.location.href);
    let link = '';

    switch (platform) {
      case 'vk':
        link = `https://vk.com/share.php?url=${url}&title=TLOA+EP`;
        break;
      case 'telegram':
        link = `https://t.me/share/url?url=${url}&text=TLOA+EP`;
        break;
      case 'ok':
        link = `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${url}&st.title=TLOA+EP`;
        break;
      case 'bluesky':
        link = `https://bsky.app/intent/compose?text=TLOA+EP%20${url}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href)
          .then(() => {
            btn.textContent = '✓';
            setTimeout(() => btn.textContent = 'Копировать ссылку', 1200);
          })
          .catch(() => {
            btn.textContent = '⚠';
            setTimeout(() => btn.textContent = 'Копировать ссылку', 1200);
          });
        return;
      default:
        return;
    }

    window.open(link, '_blank', 'noopener,noreferrer');
    shareModal.classList.remove('open');
    document.body.style.overflow = '';
  });
});