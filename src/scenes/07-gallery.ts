import { gsap, ScrollTrigger } from '../lib/scroll';

export function initGallery() {
  const scene = document.querySelector<HTMLElement>('.scene--gallery');
  if (!scene) return;

  const slides = Array.from(scene.querySelectorAll<HTMLElement>('.gallery__slide'));
  if (slides.length === 0) return;

  // Cache the inner <img> for each slide so Ken Burns scale doesn't fight the flex layout
  const imgs = slides.map((slide) => slide.querySelector<HTMLImageElement>('img'));

  const total = slides.length;
  const peakStep = 1 / (total - 1); // distance between consecutive peaks in scene-progress space

  // Initial state: only first slide visible
  slides.forEach((slide, i) => {
    gsap.set(slide, { opacity: i === 0 ? 1 : 0 });
    const img = imgs[i];
    if (img) gsap.set(img, { scale: i === 0 ? 1 : 1.06 });
  });

  // Scroll-scrubbed crossfade. Each slide has its own "peak" on the scroll
  // timeline; opacity falls off linearly to the adjacent peaks for a smooth
  // crossfade between any two consecutive images.
  ScrollTrigger.create({
    trigger: scene,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.8,
    onUpdate: (self) => {
      const progress = self.progress;
      for (let i = 0; i < total; i++) {
        const peak = i * peakStep;
        const distance = Math.abs(progress - peak);
        const opacity = Math.max(0, 1 - distance / peakStep);
        // Subtle Ken Burns: image is at scale 1 at peak, drifts to 1.06 at edges
        const scale = 1 + 0.06 * (1 - opacity);
        slides[i].style.opacity = opacity.toFixed(3);
        const img = imgs[i];
        if (img) img.style.transform = `scale(${scale.toFixed(4)})`;
      }
    },
  });

  // Caption reveal — fades in/out alongside its matching slide
  const captions = scene.querySelectorAll<HTMLElement>('.gallery__caption');
  captions.forEach((caption, i) => {
    gsap.set(caption, { opacity: i === 0 ? 1 : 0 });
  });
  ScrollTrigger.create({
    trigger: scene,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.6,
    onUpdate: (self) => {
      const progress = self.progress;
      captions.forEach((caption, i) => {
        const peak = i * peakStep;
        const distance = Math.abs(progress - peak);
        // Captions fade off faster than images so they don't blur during transitions
        const opacity = Math.max(0, 1 - distance / (peakStep * 0.6));
        caption.style.opacity = opacity.toFixed(3);
      });
    },
  });
}
