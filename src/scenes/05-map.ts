import { gsap, ScrollTrigger } from '../lib/scroll';

const CITY_ORDER = ['samsun', 'amasya', 'erzurum', 'sivas', 'ankara'] as const;

export function initMap() {
  const scene = document.querySelector<HTMLElement>('.scene--map');
  if (!scene) return;

  const route = scene.querySelector<SVGPathElement>('.map__route');
  const cardsContainer = scene.querySelector<HTMLElement>('.map__cards');
  const cards = Array.from(scene.querySelectorAll<HTMLElement>('.map__card'));
  const cities = CITY_ORDER.map((id) =>
    scene.querySelector<SVGGElement>(`.city[data-city="${id}"]`)
  );

  // Intro reveal as scene enters
  gsap.from(scene.querySelector('.map__intro'), {
    opacity: 0,
    y: 30,
    duration: 1,
    scrollTrigger: { trigger: scene, start: 'top 70%', toggleActions: 'play none none reverse' },
  });

  // Route line draws across the duration of all cards scrolling past
  if (route && cardsContainer) {
    const length = route.getTotalLength?.() ?? 1000;
    gsap.set(route, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
    gsap.to(route, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: cardsContainer,
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 1,
      },
    });
  }

  // Each card both reveals itself AND lights up its matching city.
  // Triggering off the card (not scene %) keeps the map and the cards
  // perfectly in sync regardless of viewport height or scroll speed.
  cards.forEach((card, i) => {
    const city = cities[i];

    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    if (city) {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 75%',
        onEnter: () => city.classList.add('is-active'),
        onLeaveBack: () => city.classList.remove('is-active'),
      });
    }
  });
}
