import { useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useEffect } from 'react';

let clamp = (number: number, min: number, max: number) => Math.min(Math.max(number, min), max);

export function useBoundedScroll(bounds: number) {
  let { scrollY } = useScroll();
  let scrollYBounded = useMotionValue(0);
  let scrollYBoundedProgress = useTransform(scrollYBounded, [0, bounds], [0, 1]);

  useEffect(() => {
    return scrollY.on('change', (current) => {
      let previous = scrollY.getPrevious();
      let diff = current - previous;
      let newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, bounds));
    });
  }, [bounds, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
}
