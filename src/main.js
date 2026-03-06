import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ══════════════════════════════════════════════════════════════════════════════
// ✏️  CHANGE YOUR START DATE HERE
// Format: new Date('YYYY-MM-DDTHH:MM:SS')
// ══════════════════════════════════════════════════════════════════════════════
const START_DATE = new Date('2025-10-28T15:10:00');
// ══════════════════════════════════════════════════════════════════════════════


// ══════════════════════════════════════════════════════════════════════════════
// ✏️  EDIT YOUR MILESTONES HERE
// ══════════════════════════════════════════════════════════════════════════════
const MILESTONES = [
  {
    date: "August 1st, 2025",
    title: "The Day We Met",
    desc: "A chance encounter that changed everything.",
    longDesc: "I still remember exactly what you were wearing. The way you looked at me. I knew there was something different about you before you said a single word to me.",
    photo: null,
    side: "left"
  },
  {
    date: "August 22nd, 2025",
    title: "Our First Conversation",
    desc: "We talked for a while and exchanged instagram.",
    longDesc: "The eye contact the way we were constantly looking at each other. And thanks to Ameya we are here.",
    photo: null,
    side: "right"
  },
  {
    date: "September 13th, 2025",
    title: "Our First Date",
    desc: "Nervous hands, soft laughter, and something that felt like magic.",
    longDesc: "The demon slayer movie was so good. We were so new to each other and spoke for hours after the movie as well. I went home and immediately wanted to do it all over again.",
    photo: null,
    side: "left"
  },
  {
    date: "September 16th, 2025",
    title: "First Photo Together",
    desc: "Proof that this was real.",
    longDesc: "We didnt take any pics during our first date and on this day we took it was raining and all i could think of was you. Now it's my favorite photo I've ever taken.",
    photo: null,
    side: "right"
  },
  {
    date: "October 16th, 2025",
    title: "The Day I Knew",
    desc: "Quietly, completely, I realized I loved you.",
    longDesc: "We waited for your buss to come, you tried pan for me, you were gonna leave for banglore, and it hit me so suddenly and so calmly — like something that had always been true finally deciding to make itself known.",
    photo: null,
    side: "left"
  }
];
// ══════════════════════════════════════════════════════════════════════════════


// ── Counter logic ─────────────────────────────────────────────────────────────
function getTimeDiff(start) {
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let mins = now.getMinutes() - start.getMinutes();
  let secs = now.getSeconds() - start.getSeconds();

  if (secs < 0) { secs += 60; mins--; }
  if (mins < 0) { mins += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  return { years, months, days, hours, mins, secs };
}

function animatePop(el) {
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
  setTimeout(() => el.classList.remove('pop'), 200);
}

function flashWrap(el) {
  el.classList.remove('tick');
  void el.offsetWidth;
  el.classList.add('tick');
  setTimeout(() => el.classList.remove('tick'), 300);
}

const els = {
  years: document.getElementById('t-years'),
  months: document.getElementById('t-months'),
  days: document.getElementById('t-days'),
  hours: document.getElementById('t-hours'),
  mins: document.getElementById('t-minutes'),
  secs: document.getElementById('t-seconds'),
};

let prev = {};

function updateCounter() {
  const t = getTimeDiff(START_DATE);
  const keys = ['years', 'months', 'days', 'hours', 'mins', 'secs'];

  keys.forEach(k => {
    const val = String(t[k]).padStart(2, '0');
    if (prev[k] !== val) {
      els[k].textContent = val;
      animatePop(els[k]);
      if (k === 'secs') flashWrap(els[k].closest('.time-number-wrap'));
      prev[k] = val;
    }
  });
}

updateCounter();
setInterval(updateCounter, 1000);

// ── Floating background hearts in timer section ───────────────────────────────
function spawnBgHeart() {
  const container = document.getElementById('time-bg-hearts');
  if (!container) return;
  const h = document.createElement('div');
  h.className = 'bg-heart';
  h.innerHTML = `<svg viewBox="0 0 32 29.6" fill="currentColor" style="width:${Math.random() * 18 + 8}px;">
    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
  </svg>`;
  h.style.left = `${Math.random() * 100}%`;
  h.style.animationDuration = `${Math.random() * 8 + 7}s`;
  h.style.animationDelay = `${Math.random() * 3}s`;
  container.appendChild(h);
  setTimeout(() => h.remove(), 15000);
}
setInterval(spawnBgHeart, 1200);

// ── Scroll entrance for timer section ────────────────────────────────────────
gsap.from('#time-section .time-title', {
  scrollTrigger: { trigger: '#time-section', start: 'top 70%' },
  opacity: 0, y: 30, duration: 1.2, ease: 'power3.out'
});
gsap.from('#time-section .time-unit', {
  scrollTrigger: { trigger: '#time-section', start: 'top 60%' },
  opacity: 0, y: 40, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.3
});
gsap.from('#time-section .time-caption', {
  scrollTrigger: { trigger: '#time-section', start: 'top 50%' },
  opacity: 0, y: 20, duration: 1, ease: 'power2.out', delay: 0.8
});

// ── Build timeline ────────────────────────────────────────────────────────────
function buildTimeline() {
  const container = document.getElementById('timeline-events');
  if (!container) return;
  MILESTONES.forEach((m, i) => {
    const side = m.side || (i % 2 === 0 ? 'left' : 'right');
    const el = document.createElement('div');
    el.className = `milestone ${side}`;
    el.innerHTML = `
      <div class="milestone-heart">
        <svg viewBox="0 0 32 29.6" fill="currentColor">
          <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
        </svg>
      </div>
      <div class="milestone-sparkles">
        <span></span><span></span><span></span>
        <span></span><span></span><span></span>
      </div>
      <div class="milestone-card">
        <p class="milestone-date">${m.date}</p>
        <h3 class="milestone-title">${m.title}</h3>
        <p class="milestone-desc">${m.desc}</p>
        ${m.photo ? `<div class="milestone-photo"><img src="${m.photo}" alt="${m.title}" loading="lazy"></div>` : ''}
        <p class="milestone-long-desc">${m.longDesc}</p>
      </div>`;
    el.querySelector('.milestone-card').addEventListener('click', () => {
      el.querySelector('.milestone-card').classList.toggle('expanded');
    });
    container.appendChild(el);
  });
}
buildTimeline();

document.querySelectorAll('.milestone').forEach(el => {
  gsap.fromTo(el, { opacity: 0, y: 50 }, {
    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: {
      trigger: el, start: 'top 80%',
      onEnter: () => {
        el.classList.add('visible');
        el.querySelectorAll('.milestone-sparkles span').forEach(s => {
          s.style.animation = 'none';
          void s.offsetWidth;
          s.style.animation = '';
        });
      }
    }
  });
});

// ── Particles ─────────────────────────────────────────────────────────────────
function createParticle() {
  const container = document.getElementById('particle-container');
  const p = document.createElement('div');
  p.classList.add('sparkle');
  const size = Math.random() * 3 + 1;
  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  p.style.left = `${Math.random() * 100}vw`;
  p.style.top = `${Math.random() * 100}vh`;
  p.style.animationDuration = `${Math.random() * 4 + 3}s`;
  container.appendChild(p);
  setTimeout(() => p.remove(), 7000);
}
setInterval(createParticle, 500);

// ── Music ─────────────────────────────────────────────────────────────────────
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const musicTooltip = document.getElementById('music-tooltip');
let isPlaying = false;
bgMusic.volume = 0;

musicBtn.addEventListener('click', () => {
  if (musicTooltip) gsap.to(musicTooltip, { opacity: 0, duration: 0.5, onComplete: () => musicTooltip.remove() });
  if (isPlaying) {
    gsap.to(bgMusic, { volume: 0, duration: 1.5, onComplete: () => bgMusic.pause() });
    iconPause.classList.add('hidden');
    iconPlay.classList.remove('hidden');
  } else {
    bgMusic.play();
    gsap.to(bgMusic, { volume: 0.45, duration: 2.5 });
    iconPlay.classList.add('hidden');
    iconPause.classList.remove('hidden');
  }
  isPlaying = !isPlaying;
});

// ── Scroll Heart ──────────────────────────────────────────────────────────────
gsap.to('#scroll-heart', { y: '+=15', rotation: '+=8', duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  gsap.to('#scroll-heart', { top: `${8 + pct * 75}vh`, left: `${8 + Math.sin(pct * Math.PI * 3) * 20}vw`, duration: 0.8, ease: 'power1.out' });
});

// ── Quotes ────────────────────────────────────────────────────────────────────
const quotes = [
  "I look at you and see the rest of my life in front of my eyes.",
  "Every love story is beautiful, but ours is my favorite.",
  "I am who I am because of you. You are every reason, every hope, and every dream I've ever had.",
  "You are my today and all of my tomorrows.",
  "I love you not only for what you are, but for what I am when I am with you.",
  "In a sea of people, my eyes will always search for you.",
  "You make ordinary moments feel like poetry.",
  "Home is not a place — it is you."
];
const btnQuote = document.getElementById('btn-quote');
const quoteDisplay = document.getElementById('quote-display');
const quoteText = quoteDisplay.querySelector('.quote-text');

btnQuote.addEventListener('click', () => {
  quoteDisplay.classList.remove('visible');
  setTimeout(() => {
    quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.classList.remove('hidden');
    void quoteDisplay.offsetWidth;
    quoteDisplay.classList.add('visible');
  }, 400);
});

// ── Memories ──────────────────────────────────────────────────────────────────
const TOTAL_IMAGES = 102; // ← change to your actual number of photos
const memories = Array.from({ length: TOTAL_IMAGES }, (_, i) =>
  `/assets/images/drive/photo${i + 1}.JPG`
);
const btnMemory = document.getElementById('btn-memory');
const memoryDisplay = document.getElementById('memory-display');
const memoryImg = document.getElementById('memory-img');

btnMemory.addEventListener('click', () => {
  memoryDisplay.classList.remove('visible');
  setTimeout(() => {
    memoryImg.src = memories[Math.floor(Math.random() * memories.length)];
    memoryDisplay.classList.remove('hidden');
    void memoryDisplay.offsetWidth;
    memoryDisplay.style.transform = `translateY(0) rotate(${(Math.random() * 8 - 4).toFixed(1)}deg)`;
    memoryDisplay.classList.add('visible');
  }, 400);
});

// ── Final Section ─────────────────────────────────────────────────────────────
const btnFinal = document.getElementById('btn-final');
const finalContainer = document.getElementById('final-message-container');
const heartCluster = document.getElementById('final-heart-cluster');
const bigHeart = document.getElementById('big-heart');

btnFinal.addEventListener('click', () => {
  gsap.to(btnFinal, { opacity: 0, y: 10, duration: 0.8, onComplete: () => btnFinal.classList.add('hidden') });
  document.body.classList.add('dark-mode');
  if (isPlaying) gsap.to(bgMusic, { volume: 0.85, duration: 4 });
  finalContainer.classList.remove('hidden');
  for (let i = 0; i < 35; i++) {
    const h = document.createElement('div');
    h.innerHTML = `<svg viewBox="0 0 32 29.6" fill="#b388ff" style="width:${Math.random() * 16 + 10}px;opacity:0.7;"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg>`;
    h.style.cssText = `position:absolute;left:${Math.random() * 100}%;bottom:-60px;opacity:0;`;
    heartCluster.appendChild(h);
    gsap.to(h, { bottom: '50%', left: '50%', opacity: 1, scale: 0.6, duration: Math.random() * 2 + 2, ease: 'power2.out', delay: Math.random() * 2, onComplete: () => { h.style.opacity = '0'; } });
  }
  setTimeout(() => {
    bigHeart.classList.remove('hidden');
    void bigHeart.offsetWidth;
    bigHeart.classList.add('visible');
    if (isPlaying) gsap.to(bgMusic, { volume: 0.35, duration: 4, delay: 2 });
  }, 4200);
});

// ── Scroll entrances for other panels ────────────────────────────────────────
gsap.utils.toArray('.panel:not(#hero):not(.timeline-panel):not(#time-section)').forEach(panel => {
  const label = panel.querySelector('.section-label');
  const heading = panel.querySelector('.section-heading');
  const btn = panel.querySelector('.elegant-btn');
  if (label) gsap.from(label, { scrollTrigger: { trigger: panel, start: 'top 70%' }, opacity: 0, x: -20, duration: 1, ease: 'power2.out' });
  if (heading) gsap.from(heading, { scrollTrigger: { trigger: panel, start: 'top 65%' }, opacity: 0, y: 15, duration: 1, delay: 0.2, ease: 'power2.out' });
  if (btn) gsap.from(btn, { scrollTrigger: { trigger: panel, start: 'top 60%' }, opacity: 0, y: 20, duration: 1, delay: 0.4, ease: 'power2.out' });
});