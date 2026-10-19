import { motion, MotionValue } from 'framer-motion';
export default function ScrollProgress({ progress }: { progress: MotionValue<number> }) {
  return <div className="scroll-progress" aria-hidden="true"><motion.div className="scroll-progress-line" style={{ scaleX: progress }} /><motion.span className="scroll-progress-heart" style={{ left: progress }}>♥</motion.span></div>;
}
