import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useScrollSky } from '../../hooks/useScrollSky';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const StarCanvas = lazy(() => import('./StarCanvas'));

export default function SkyBackground() {
  const { scrollYProgress, indigo, dusk, rose, gold, moonOpacity, sunOpacity, sunY, sunX } = useScrollSky();
  const starsOpacity = useTransform(scrollYProgress, [0, .18, .55, .78], [1, 1, .55, 0]);
  const mobile = useIsMobile(); const reduced = useReducedMotion();
  const [visible, setVisible] = useState(!document.hidden);
  const [webgl, setWebgl] = useState(false);
  useEffect(() => { const change = () => setVisible(!document.hidden); document.addEventListener('visibilitychange', change); return () => document.removeEventListener('visibilitychange', change); }, []);
  useEffect(() => { try { setWebgl(Boolean(document.createElement('canvas').getContext('webgl2'))); } catch { setWebgl(false); } }, []);
  return <div className="sky-background" aria-hidden="true">
    <div className="sky-layer sky-midnight" />
    <motion.div className="sky-layer sky-indigo" style={{ opacity: indigo }} />
    <motion.div className="sky-layer sky-dusk" style={{ opacity: dusk }} />
    <motion.div className="sky-layer sky-rose" style={{ opacity: rose }} />
    <motion.div className="sky-layer sky-gold" style={{ opacity: gold }} />
    <motion.div className="star-canvas" style={{ opacity: starsOpacity }}>
      {!reduced && webgl && <Suspense fallback={null}><StarCanvas mobile={mobile} visible={visible} /></Suspense>}
    </motion.div>
    <div className="css-stars" />
    <div className="aurora" />
    <motion.div className="moon-orb" style={{ opacity: moonOpacity }} />
    <motion.div className="sun-orb" style={{ opacity: sunOpacity, x: sunX, y: sunY }} />
    <div className="shooting-star" />
    <div className="sky-vignette" />
  </div>;
}
