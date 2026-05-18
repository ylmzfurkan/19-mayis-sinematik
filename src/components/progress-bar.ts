export function initProgressBar() {
  const bar = document.querySelector<HTMLElement>('#progress-bar span');
  if (!bar) return;

  let ticking = false;
  const update = () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
    bar.style.width = `${pct}%`;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}
