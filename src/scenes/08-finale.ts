import { gsap } from '../lib/scroll';

export function initFinale() {
  const scene = document.querySelector<HTMLElement>('.scene--finale');
  if (!scene) return;

  const flag = scene.querySelector<HTMLElement>('.finale__flag');
  const motto = scene.querySelector<HTMLElement>('.finale__motto');
  const small = scene.querySelector<HTMLElement>('.finale__small');

  const tl = gsap.timeline({
    scrollTrigger: { trigger: scene, start: 'top 70%', toggleActions: 'play none none reverse' },
  });
  tl.from(flag, { scale: 0.6, opacity: 0, duration: 1.2, ease: 'back.out(1.4)' })
    .from(motto, { opacity: 0, y: 40, duration: 1 }, '-=0.4')
    .from(small, { opacity: 0, y: 20, duration: 0.8 }, '-=0.4');
}
