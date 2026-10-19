import { motion } from 'framer-motion';
import { content } from '../../content';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SceneWrapper from '../global/SceneWrapper';

export default function Scene1Opening() {
  const reduced = useReducedMotion();
  return <SceneWrapper id="opening" className="opening-scene">
    <div className="scene-inner opening-inner"><span className="eyebrow scene-index">{content.opening.eyebrow}</span>
      <div className="opening-lines">{content.opening.lines.map((line, index) => <motion.p key={line} className={`display opening-line opening-line-${index + 1}`} initial={{ opacity: 0, y: 20, filter: reduced ? 'none' : 'blur(14px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: reduced ? .3 : 1.3, delay: reduced ? 0 : index * 1.65, ease: [0.22, 1, .36, 1] }}>{line}</motion.p>)}</div>
      <div className="scroll-hint"><span>{content.ui.scroll}</span><i /></div>
    </div>
  </SceneWrapper>;
}
