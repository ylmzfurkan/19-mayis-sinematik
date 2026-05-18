import { gsap, ScrollTrigger } from '../lib/scroll';

export function initHitabe() {
  const scene = document.querySelector<HTMLElement>('.scene--hitabe');
  if (!scene) return;

  const lines = scene.querySelectorAll<HTMLElement>('.hitabe__line');
  const signature = scene.querySelector<HTMLElement>('.hitabe__signature');
  const eyebrow = scene.querySelector<HTMLElement>('.eyebrow');

  // Pin the scene briefly while text reveals line by line
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: 'top top',
      end: '+=180%',
      scrub: 0.8,
      pin: true,
      pinSpacing: true,
    },
  });

  tl.from(eyebrow, { opacity: 0, y: 20 }, 0);
  lines.forEach((line, i) => {
    tl.fromTo(
      line,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 },
      i * 0.8
    );
  });
  tl.from(signature, { opacity: 0, y: 20 }, '>0.5');
}
