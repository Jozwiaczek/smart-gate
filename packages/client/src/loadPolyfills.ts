(async () => {
  if (typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer');
  }
})();

export {};
