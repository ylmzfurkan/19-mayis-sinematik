export function initAudioToggle() {
  const btn = document.getElementById('audio-toggle') as HTMLButtonElement | null;
  const audio = document.getElementById('ambient') as HTMLAudioElement | null;
  if (!btn || !audio) return;

  audio.volume = 0.7;

  const syncButton = (playing: boolean) => {
    btn.setAttribute('aria-pressed', String(playing));
    btn.setAttribute('aria-label', playing ? 'Sesi kapat' : 'Sesi aç');
  };

  // Reflect any external state changes (autoplay success, ended, etc.)
  audio.addEventListener('play', () => syncButton(true));
  audio.addEventListener('pause', () => syncButton(false));

  // Manual toggle from the button itself
  btn.addEventListener('click', async () => {
    if (audio.paused) {
      try {
        await audio.play();
      } catch (err) {
        console.warn('Audio play failed:', err);
      }
    } else {
      audio.pause();
    }
  });

  // Auto-start: try immediately, then fall back to the first user gesture.
  // Browsers block programmatic play() before user interaction, so we listen
  // for the earliest interaction events and try again. once: true cleans up
  // the listeners as soon as audio successfully starts.
  const tryPlay = async () => {
    try {
      await audio.play();
      return true;
    } catch {
      return false;
    }
  };

  const armOnFirstInteraction = () => {
    // Browsers only treat these as "user activation" for unblocking audio.
    // Scroll/wheel events fire but are NOT accepted as activation — including
    // them here was misleading, so they're gone.
    const events: (keyof WindowEventMap)[] = [
      'pointerdown', 'pointerup', 'click', 'touchstart', 'keydown',
    ];
    const handler = async () => {
      const ok = await tryPlay();
      if (ok) {
        events.forEach((ev) => window.removeEventListener(ev, handler));
      }
    };
    events.forEach((ev) =>
      window.addEventListener(ev, handler, { passive: true })
    );
  };

  // Kick things off: first immediate attempt, then arm interaction fallback.
  tryPlay().then((ok) => {
    if (!ok) armOnFirstInteraction();
  });
}
