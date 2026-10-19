import { useScroll, useTransform } from 'framer-motion';

export function useScrollSky() {
  const { scrollYProgress } = useScroll();
  const indigo = useTransform(scrollYProgress, [0, 0.12, 0.26, 0.44], [0, 0.55, 1, 0]);
  const dusk = useTransform(scrollYProgress, [0.19, 0.37, 0.53, 0.68], [0, 0.3, 1, 0]);
  const rose = useTransform(scrollYProgress, [0.45, 0.64, 0.77, 0.9], [0, 0.35, 1, 0]);
  const gold = useTransform(scrollYProgress, [0.69, 0.85, 1], [0, 0.65, 1]);
  const moonOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5], [1, 0.8, 0]);
  const sunOpacity = useTransform(scrollYProgress, [0.42, 0.61, 0.8], [0, 0.5, 1]);
  const sunY = useTransform(scrollYProgress, [0.38, 1], ['95svh', '15svh']);
  const sunX = useTransform(scrollYProgress, [0.38, 0.75, 1], ['25vw', '55vw', '65vw']);
  return { scrollYProgress, indigo, dusk, rose, gold, moonOpacity, sunOpacity, sunY, sunX };
}
