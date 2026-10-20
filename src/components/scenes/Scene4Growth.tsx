import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { content } from '../../content';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SceneWrapper from '../global/SceneWrapper';

export default function Scene4Growth() {
  const list = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 85%', 'end 45%'] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const reduced = useReducedMotion();
  return <SceneWrapper id="growth" className="growth-scene"><div className="scene-inner growth-inner">
    <span className="eyebrow scene-index">{content.growth.eyebrow}</span><h2 className="display section-title">{content.growth.title}</h2>
    <div className="growth-timeline" ref={list}><svg className="timeline-line" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true"><motion.path d="M1 0V100" fill="none" stroke="#FFC600" strokeWidth="1" style={{ pathLength: reduced ? 1 : pathLength }} /></svg>
      {content.growth.milestones.map((step, index) => <motion.article className="growth-step glass" key={step.title} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .8, delay: index * .1 }}><span className="growth-dot" aria-hidden="true">✦</span><span className="growth-number">0{index + 1}</span><h3 className="display">{step.title}</h3><p>{step.body}</p></motion.article>)}
    </div><p className="display growth-tagline">{content.growth.tagline}</p>
  </div></SceneWrapper>;
}
