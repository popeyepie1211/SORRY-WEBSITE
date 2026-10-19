import { motion, MotionValue, useTransform } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function Plant({ x, height, progress, index, reduced, celebrate }: { x: number; height: number; progress: MotionValue<number>; index: number; reduced: boolean; celebrate: boolean }) {
  const start = 0.32 + index * 0.035;
  const growth = useTransform(progress, [start, start + 0.26], [0, 1]);
  const bloom = useTransform(progress, [0.68 + index * 0.01, 0.91], [0, 1]);
  return <g transform={`translate(${x} 104)`}>
    <motion.path d={`M0 0 Q ${index % 2 ? -6 : 7} ${-height * .48} 0 ${-height}`} fill="none" stroke="#9DBD8A" strokeWidth="1.5" style={{ pathLength: reduced || celebrate ? 1 : growth }} />
    <motion.path d={`M0 ${-height * .48} q-12 -11 -18 -4 q10 8 18 4 M0 ${-height * .65} q12 -10 17 -3 q-9 8 -17 3`} fill="#9DBD8A" stroke="#9DBD8A" strokeWidth=".7" style={{ opacity: reduced || celebrate ? 1 : growth }} />
    <motion.g style={{ opacity: reduced || celebrate ? 1 : bloom, scale: reduced || celebrate ? 1 : bloom, transformOrigin: `0px ${-height}px` }} transform={`translate(0 ${-height})`}>
      {[0, 72, 144, 216, 288].map((angle) => <ellipse key={angle} cx="0" cy="-8" rx="4.2" ry="9" transform={`rotate(${angle})`} fill={index % 2 ? '#F2B8A2' : '#FFD9A0'} opacity=".9" />)}
      <circle r="3.6" fill="#FFF6EA" />
    </motion.g>
  </g>;
}

export default function GroundGarden({ progress, celebrate }: { progress: MotionValue<number>; celebrate: boolean }) {
  const mobile = useIsMobile(); const reduced = useReducedMotion();
  const plants = mobile ? [7, 19, 31, 43, 56, 69, 82, 94] : [4, 11, 18, 25, 32, 39, 46, 53, 60, 67, 74, 81, 88, 95];
  const groundOpacity = useTransform(progress, [0, .12, 1], [.55, .78, 1]);
  return <motion.div className={`ground-garden ${celebrate ? 'garden-celebrate' : ''}`} style={{ opacity: groundOpacity }} aria-hidden="true"><svg viewBox="0 0 100 112" preserveAspectRatio="none">
    <defs><linearGradient id="ground-line"><stop stopColor="#B9A9C9" /><stop offset=".55" stopColor="#E8798A" /><stop offset="1" stopColor="#FFD9A0" /></linearGradient></defs>
    <path d="M0 104 Q 9 102 17 104 T 34 104 T 52 104 T 71 104 T 100 104" fill="none" stroke="url(#ground-line)" strokeWidth=".55" />
    <path d="M10 104 l-2 4 m2-4 l2 3 M64 104 l-3 4 m3-4 l2 3" fill="none" stroke="#B9A9C9" strokeWidth=".3" opacity=".65" />
    {plants.map((x, i) => <Plant key={x} x={x} height={11 + i % 4 * 5} progress={progress} index={i} reduced={reduced} celebrate={celebrate} />)}
  </svg><div className="fireflies"><i /><i /><i /><i /><i /></div></motion.div>;
}
