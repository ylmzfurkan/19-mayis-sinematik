import { gsap, ScrollTrigger } from '../lib/scroll';

export function initIstanbul() {
  const scene = document.querySelector<HTMLElement>('.scene--istanbul');
  if (!scene) return;

  const ship = scene.querySelector<HTMLElement>('.parallax__ship');
  const hills = scene.querySelector<HTMLElement>('.parallax__hills');
  const sky = scene.querySelector<HTMLElement>('.parallax__sky');
  const text = scene.querySelector<HTMLElement>('.scene__text');

  // Parallax depth as we scroll
  gsap.to(sky, {
    yPercent: -10,
    scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: true },
  });
  gsap.to(hills, {
    yPercent: -25,
    scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: true },
  });

  // Ship sails across from left to centre then off-right
  gsap.fromTo(
    ship,
    { x: -100, opacity: 0 },
    {
      x: () => window.innerWidth + 200,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: scene,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    }
  );

  // Add gentle ship bob (independent of scroll)
  gsap.to(ship, { y: -8, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  // Text reveal
  gsap.from(text, {
    opacity: 0,
    y: 40,
    duration: 1,
    scrollTrigger: {
      trigger: text,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}
