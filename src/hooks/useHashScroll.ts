import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** How long to keep waiting for a hash target that is still being fetched. */
const TARGET_TIMEOUT_MS = 5000;

/**
 * Tries to scroll to the hash target, retrying while the section is still
 * being fetched, then gives up after `TARGET_TIMEOUT_MS`.
 */
const scrollToHash = (hash: string): void => {
  const scrollToTarget = (): boolean => {
    const target = document.querySelector(hash);

    if (!target) {
      return false;
    }

    target.scrollIntoView({ block: 'start' });
    return true;
  };

  if (scrollToTarget()) {
    return;
  }

  const observer = new MutationObserver(() => {
    if (scrollToTarget()) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), TARGET_TIMEOUT_MS);
};

/**
 * Scrolls to the hash target after a navigation, or to the top when a route
 * changes without one — so `/#about` works from any page.
 *
 * Sections can be rendered from fetched data, so the target may not exist yet
 * on the first pass; the observer waits for it to appear.
 */
export const useHashScroll = (): void => {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }

    scrollToHash(hash);
  }, [pathname]);

  useEffect(() => {
    const onHashChange = (): void => {
      const hash = window.location.hash;

      if (!hash) {
        return;
      }

      scrollToHash(hash);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
};
