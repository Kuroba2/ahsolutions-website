// The page's main content is already present in index.html, so crawlers and
// visitors without JavaScript can read it. JS only improves mobile navigation.
const mobileMenu = document.querySelector<HTMLDetailsElement>('.mobile-nav');

if (mobileMenu) {
  mobileMenu.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.open = false;
    });
  });

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') mobileMenu.open = false;
  });
}
