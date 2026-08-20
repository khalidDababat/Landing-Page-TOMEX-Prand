import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** How long to keep waiting for a hash target that is still being fetched. */
const TARGET_TIMEOUT_MS = 5000;

/**
 * Scrolls to the hash target after a navigation, or to the top when a route
 * changes without one — so `/#about` works from any page.
 *
 * Sections are rendered from fetched data, so the target may not exist yet on
 * the first pass; the observer waits for it to appear.
 */
export const useHashScroll = (): void => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }

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
    const timeoutId = window.setTimeout(() => observer.disconnect(), TARGET_TIMEOUT_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [pathname, hash]);
};
