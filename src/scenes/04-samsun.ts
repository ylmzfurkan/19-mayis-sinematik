import { gsap, ScrollTrigger } from '../lib/scroll';

export function initSamsun() {
  const scene = document.querySelector<HTMLElement>('.scene--samsun');
  if (!scene) return;

  const sky = scene.querySelector<HTMLElement>('.samsun__sky');
  const sun = scene.querySelector<HTMLElement>('.samsun__sun');
  const title = scene.querySelector<HTMLElement>('.samsun__title');
  const lead = scene.querySelector<HTMLElement>('.samsun__lead');
  const eyebrow = scene.querySelector<HTMLElement>('.eyebrow');

  // Dawn rises as user scrolls into Samsun
  ScrollTrigger.create({
    trigger: scene,
    start: 'top bottom',
    end: 'center center',
    scrub: 1,
    animation: gsap.timeline()
      .to(sky, { opacity: 1, duration: 1 }, 0)
      .to(sun, { opacity: 1, y: '-30%', duration: 1 }, 0.2),
  });

  // Headline reveal
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });
  tl.from(eyebrow, { opacity: 0, y: 20, duration: 0.6 })
    .from(title, { opacity: 0, y: 40, duration: 1 }, '-=0.2')
    .from(lead, { opacity: 0, y: 30, duration: 0.9 }, '-=0.5');
}
