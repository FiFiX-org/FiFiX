import { Ref, RefCallback, useCallback, useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export type Size = {
  width: number;
  height: number;
};

function getSize(target: Element) {
  // `Math.round` is in line with how CSS resolves sub-pixel values
  const height = Math.round(target.clientHeight);
  const width = Math.round(target.clientWidth);
  return { width, height };
}

export function useResize<E extends Element = Element>(): [
  Ref<E>,
  Size | null,
  ResizeObserver | null,
] {
  const [size, setSize] = useState<Size | null>(null);
  const onResize = useCallback((newSize: Size) => {
    setSize((oldSize) => {
      return oldSize?.height === newSize.height &&
        oldSize.width === newSize.width
        ? oldSize
        : newSize;
    });
  }, []);
  const [ref, observer] = useResizeCallback<E>(onResize);
  return [ref, size, observer];
}

export function useResizeCallback<E extends Element = Element>(
  onResize: (size: Size) => void,
): [RefCallback<E>, ResizeObserver | null] {
  const [el, setEl] = useState<Element | null>(null);
  const [observer, setObserver] = useState<ResizeObserver | null>(null);
  const ref = useCallback(
    (e: Element | null) => {
      e && onResize(getSize(e));
      setEl(e);
    },
    [onResize],
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) {
        return;
      }

      // Since we only observe the one element, we don't need to loop over the
      // array
      if (!entries.length) {
        return;
      }

      const entry = entries[0];
      onResize(getSize(entry.target));
    });
    setObserver(resizeObserver);
    return () => {
      setObserver(null);
      resizeObserver.disconnect();
    };
  }, [onResize]);
  useEffect(() => {
    if (el && observer) {
      observer.observe(el);
      return () => {
        observer.unobserve(el);
      };
    }
  }, [el, observer]);
  return [ref, observer];
}
