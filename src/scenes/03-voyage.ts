import { gsap, ScrollTrigger } from '../lib/scroll';

export function initVoyage() {
  const scene = document.querySelector<HTMLElement>('.scene--voyage');
  if (!scene) return;

  const waves = scene.querySelectorAll<SVGPathElement>('.voyage__waves .wave');
  const ship = scene.querySelector<HTMLElement>('.voyage__ship');
  const moon = scene.querySelector<HTMLElement>('.voyage__moon');
  const mistFar = scene.querySelector<HTMLElement>('.voyage__mist--far');
  const mistNear = scene.querySelector<HTMLElement>('.voyage__mist--near');
  const chapters = scene.querySelectorAll<HTMLElement>('.voyage__chapter');
  const quote = scene.querySelector<HTMLElement>('.voyage__quote');

  // Waves undulate
  waves.forEach((wave, i) => {
    gsap.to(wave, {
      attr: { d: getWavePath(i) },
      duration: 4 + i * 0.7,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
  });

  // Ship: gentle bobbing
  if (ship) {
    gsap.to(ship, {
      y: '+=14',
      rotation: 1.8,
      duration: 3.6,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    // Ship drifts slowly across the atmosphere as the entire scene scrolls
    gsap.fromTo(
      ship,
      { xPercent: -140 },
      {
        xPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      }
    );
  }

  // Lantern flicker handled by CSS

  // Mood transitions per chapter — JS adds a data-mood attribute to the scene,
  // CSS reacts with a tint overlay (.voyage__tint).
  const moods: Record<string, string> = {
    intro: 'night',
    '1': 'night',
    '2': 'storm',
    '3': 'dawn',
  };
  chapters.forEach((ch) => {
    const key = ch.dataset.chapter ?? 'intro';
    ScrollTrigger.create({
      trigger: ch,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => scene.setAttribute('data-mood', moods[key] ?? 'night'),
      onEnterBack: () => scene.setAttribute('data-mood', moods[key] ?? 'night'),
    });
  });

  // Stormier ship in chapter 2
  if (ship) {
    ScrollTrigger.create({
      trigger: scene.querySelector('[data-chapter="2"]'),
      start: 'top center',
      end: 'bottom center',
      onEnter: () => gsap.to(ship, { rotation: '+=0', duration: 0 }),
      onLeave: () => {},
    });
  }

  // Parallax for atmospheric layers — subtle vertical drift relative to viewport
  if (moon) {
    gsap.to(moon, {
      yPercent: -20,
      scrollTrigger: { trigger: scene, start: 'top top', end: 'bottom bottom', scrub: true },
    });
  }
  if (mistFar) {
    gsap.to(mistFar, {
      yPercent: -10,
      scrollTrigger: { trigger: scene, start: 'top top', end: 'bottom bottom', scrub: true },
    });
  }
  if (mistNear) {
    gsap.to(mistNear, {
      yPercent: 18,
      scrollTrigger: { trigger: scene, start: 'top top', end: 'bottom bottom', scrub: true },
    });
  }

  // Reveal animations for each chapter's content
  chapters.forEach((chapter) => {
    const eyebrow = chapter.querySelector('.voyage__eyebrow');
    const head = chapter.querySelector('.voyage__chapter-head');
    const title = chapter.querySelector('.voyage__chapter-title');
    const paragraphs = chapter.querySelectorAll('.voyage__chapter-body p, .voyage__chapter-coda, .voyage__outro, .voyage__departure');
    const accent = chapter.querySelector('.voyage__accent');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: chapter,
        start: 'top 80%',
        end: 'top 30%',
        toggleActions: 'play none none reverse',
      },
    });
    if (eyebrow) tl.from(eyebrow, { opacity: 0, y: 20, duration: 0.8 });
    if (head)    tl.from(head,    { opacity: 0, y: 30, duration: 0.9 }, '-=0.4');
    else if (title) tl.from(title, { opacity: 0, y: 30, duration: 0.9 }, '-=0.4');
    if (paragraphs.length) {
      tl.from(paragraphs, { opacity: 0, y: 20, duration: 0.8, stagger: 0.15 }, '-=0.4');
    }
    if (accent) tl.from(accent, { opacity: 0, scale: 0.96, duration: 0.7 }, '-=0.3');
  });

  // Hero quote: dedicated reveal with a small "wow" beat
  if (quote) {
    gsap.from(quote, {
      opacity: 0,
      y: 40,
      scale: 0.96,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: quote,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });
  }
}

function getWavePath(index: number): string {
  const baseY = 80 + index * 45;
  const amplitude = 32 + index * 4;
  return `M0 ${baseY} Q360 ${baseY - amplitude} 720 ${baseY} T1440 ${baseY} V280 H0 Z`;
}
