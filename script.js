"use strict";

// === Конфигурация текстов треков ===
const LYRICS_MAP = {
  TLOAINTRO: `[Куплет]
The last of albums
It's real
This final verse
In raw we feel
No more games
Just that's ideal
Leaving a mark
That won’t conceal

[Проигрыш]

[Куплет]
The last of albums
It's real
Built dream with strength
Of music steel
Fate and rhythm
Made the deal
Now the truth
Begins to reveal

[Проигрыш]

[Куплет]
The last of albums
It's real
Every scar
We dare reveal
Wrote own pain
Made it appeal
Now it echoes
Sharp, surreal

[Проигрыш]

[Куплет]
The last of albums
It's real
Time to rise
And break the seal
This is more
Than just a reel
The last of albums
It's real`,

  JAZZSTREETFLOW: `[Припев]
Every bar's a hit
Sweat dripping heat
Tank runs on gas
Improvise like jazz
Every bar's a hit
Sweat dripping heat
Tank runs on gas
Improvise like jazz

[Рэп-куплет]
No time to wait for the sun
Clock ticks fast, gotta run
Shadows stretch under the moon
Bass drops like the hip-hop boom
Bodies start to flex and move
Silence in such light groove
Pulse locked on that soul beat
Cold concrete on the street

[Припев]
Every bar's a hit
Sweat dripping heat
Tank runs on gas
Improvise like jazz
Every bar's a hit
Sweat dripping heat
Tank runs on gas
Improvise like jazz

[Проигрыш]

[Припев]
Every bar's a hit
Sweat dripping heat
Tank runs on gas
Improvise like jazz
Every bar's a hit
Sweat dripping heat
Tank runs on gas
Improvise like jazz`,

  STILLWRITING: `[Припев]
Ya-ya-ya-ya
I'm still writing
My own light reality
And it's real
I feel, I feel

[Рэп-куплет]
Yeah, yo, yeah, yo
I'm still writing
Earlier it was
Like overwriting
Life was a VHS
Scratchy, sincere
Camcorder kid
Shootin’ the atmosphere
This is my life
Uncut, real, ya
No filters
Just the truth
Only-only yeah
I’m the product of
"Maybe tomorrow" and "no"
But summary seems like gold, yo

[Переход]
I'm still
Shootin’ my life
Because it never asked me
For skipping itself

[Припев]
Ya-ya-ya-ya
I'm still writing
My own light reality
And it's real
I feel, I feel`
};

// === DOM-элементы ===
const themeToggle = document.getElementById('theme-toggle');
const shareModal = document.getElementById('share-modal');
const closeShareModal = document.getElementById('close-share-modal');
const sharePlatformButtons = document.querySelectorAll('.share-platform-btn');

// === ВОСПРОИЗВЕДЕНИЕ ПО КЛИКУ НА ОБЛОЖКУ + ИНДИКАТОР ===
document.querySelectorAll('.main-cover').forEach(cover => {
  cover.addEventListener('click', () => {
    const trackId = cover.dataset.track;
    const audio = document.querySelector(`audio[data-track="${trackId}"]`);

    if (!audio) return;

    // Снимаем активность со всех треков
    document.querySelectorAll('.main-cover.active-track, .lyrics-btn.active-track')
      .forEach(el => el.classList.remove('active-track'));

    if (audio.paused) {
      audio.play().catch(e => console.warn('Автовоспроизведение заблокировано:', e));
      // Добавляем активность
      cover.classList.add('active-track');
      const lyricsBtn = cover.nextElementSibling?.classList?.contains('lyrics-btn')
        ? cover.nextElementSibling
        : document.querySelector(`.lyrics-btn[data-track="${trackId}"]`);
      if (lyricsBtn) lyricsBtn.classList.add('active-track');
    } else {
      audio.pause();
      // Убираем активность
      cover.classList.remove('active-track');
      const lyricsBtn = document.querySelector(`.lyrics-btn[data-track="${trackId}"]`);
      if (lyricsBtn) lyricsBtn.classList.remove('active-track');
    }
  });
});

// === НАВИГАЦИЯ ПО ТРЕКАМ ===
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const trackId = btn.dataset.track;

    // Снимаем active со всех
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Прокручиваем к нужному треку
    const targetImg = document.querySelector(`img[data-track="${trackId}"]`);
    if (targetImg) {
      targetImg.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === ИНИЦИАЛИЗАЦИЯ АКТИВНОЙ КНОПКИ ПРИ ЗАГРУЗКЕ (опционально) ===
window.addEventListener('load', () => {
  const hash = location.hash.slice(1);
  if (hash && ['TLOAINTRO', 'JAZZSTREETFLOW', 'STILLWRITING'].includes(hash)) {
    const activeBtn = document.querySelector(`.nav-btn[data-track="${hash}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
      const img = document.querySelector(`img[data-track="${hash}"]`);
      if (img) img.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    // По умолчанию активна первая кнопка
    document.querySelector('.nav-btn:first-child')?.classList.add('active');
  }
});

// === Кнопка «Текст трека» — показывает встроенный блок ===
document.querySelectorAll('.lyrics-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const trackId = btn.dataset.track;
    const lyricsBox = btn.nextElementSibling; // .lyrics-box должен идти сразу после .lyrics-btn

    if (!lyricsBox || !lyricsBox.classList.contains('lyrics-box')) {
      console.error('Не найден .lyrics-box для трека', trackId);
      return;
    }

    const text = LYRICS_MAP[trackId];
    if (text) {
      lyricsBox.querySelector('.lyrics-content').textContent = text;
      // Переключаем видимость
      lyricsBox.style.display = lyricsBox.style.display === 'none' ? 'block' : 'none';
    } else {
      console.error('Текст для трека', trackId, 'не найден');
    }
  });
});

// === Кнопка «Поделиться аудио» ===
document.querySelectorAll('.share-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    shareModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

// === Закрытие модального окна поделиться ===
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

// === Поделиться на платформу ===
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

// === Тема ===
themeToggle.addEventListener('click', () => {
  const current = document.body.getAttribute('data-theme');
  document.body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
});

// === АВТО-СКРОЛЛ К ТРЕКУ ПО ЯКОРЮ ===
window.addEventListener('load', () => {
  const hash = location.hash.slice(1); // убираем '#'
  if (!hash) return;

  // Ищем элемент с data-track == hash
  const targetElement = document.querySelector(`[data-track="${hash}"]`);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Опционально: выделяем трек (см. Этап 2)
  } else {
    console.warn(`Трек с data-track="${hash}" не найден`);
  }
});

document.querySelector('.info-toggle')?.addEventListener('click', () => {
  const content = document.querySelector('.info-content');
  content.style.display = content.style.display === 'none' ? 'block' : 'none';
});
