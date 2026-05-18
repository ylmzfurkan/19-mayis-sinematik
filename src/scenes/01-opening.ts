import { gsap, ScrollTrigger } from '../lib/scroll';

export function initOpening() {
  const scene = document.querySelector<HTMLElement>('.scene--opening');
  if (!scene) return;

  const dateSpans = scene.querySelectorAll<HTMLElement>('.opening__date span');
  const eyebrow = scene.querySelector<HTMLElement>('.opening__eyebrow');
  const scrollHint = scene.querySelector<HTMLElement>('.opening__scroll');

  // Entry animation (immediate, not scroll-triggered)
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to(eyebrow, { opacity: 1, duration: 1.2, delay: 0.4 })
    .to(dateSpans, { opacity: 1, y: 0, duration: 1, stagger: 0.25 }, '-=0.4')
    .to(scrollHint, { opacity: 1, duration: 1 }, '-=0.3');

  // Fade content out as we scroll past opening
  gsap.to('.opening__content', {
    opacity: 0,
    y: -60,
    scrollTrigger: {
      trigger: scene,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}
