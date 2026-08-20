import { useEffect } from 'react';

/** Prevents background scrolling while an overlay (e.g. mobile menu) is open. */
export const useBodyScrollLock = (locked: boolean): void => {
  useEffect(() => {
    if (!locked) {
      return;
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [locked]);
};
