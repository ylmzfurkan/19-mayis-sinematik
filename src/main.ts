import './styles/main.css';
import { initSmoothScroll, ScrollTrigger } from './lib/scroll';
import { initOpening } from './scenes/01-opening';
import { initIstanbul } from './scenes/02-istanbul';
import { initVoyage } from './scenes/03-voyage';
import { initSamsun } from './scenes/04-samsun';
import { initMap } from './scenes/05-map';
import { initHitabe } from './scenes/06-hitabe';
import { initGallery } from './scenes/07-gallery';
import { initFinale } from './scenes/08-finale';
import { initAudioToggle } from './components/audio-toggle';
import { initProgressBar } from './components/progress-bar';

function boot() {
  // Persistent UI first
  initProgressBar();
  initAudioToggle();

  // Smooth scroll + GSAP plumbing
  initSmoothScroll();

  // Scenes
  initOpening();
  initIstanbul();
  initVoyage();
  initSamsun();
  initMap();
  initHitabe();
  initGallery();
  initFinale();

  // Recalculate ScrollTrigger after fonts/images settle
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
