import { motion } from 'framer-motion';
import { content } from '../../content';

export default function IntroGate({ onBegin }: { onBegin: () => void }) {
  return <motion.div className="intro-gate" style={{ clipPath: 'circle(150% at 50% 50%)' }} exit={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }} transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}>
    <div className="gate-aura" aria-hidden="true" />
    <div className="gate-inner"><span className="eyebrow">{content.gate.eyebrow}</span><div className="gate-heart" aria-hidden="true">♥</div>
      <h1 className="display gate-title">{content.gate.title}</h1><p className="gate-note">{content.gate.note}</p>
      <button className="pill-button primary gate-button" onClick={onBegin}>{content.ui.begin}<span aria-hidden="true">↗</span></button>
    </div>
  </motion.div>;
}
