import { ReactNode, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { riseIn } from '../../lib/easing';

export default function SceneWrapper({ id, className = '', children }: { id: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  return <motion.section ref={ref} id={id} className={`scene ${className}`} data-progress={scrollYProgress.get()} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={riseIn}>{children}</motion.section>;
}
