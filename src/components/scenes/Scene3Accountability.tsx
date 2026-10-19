import { PointerEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { AccountabilityCard, content } from '../../content';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SceneWrapper from '../global/SceneWrapper';

function CardIcon({ icon }: { icon: AccountabilityCard['icon'] }) {
  const paths = {
    voice: <><path d="M8 8c0-2 1.8-3.5 4-3.5S16 6 16 8v6c0 2-1.8 3.5-4 3.5S8 16 8 14V8Z" /><path d="M5 12v2a7 7 0 0 0 14 0v-2M12 21v2" /></>,
    cloud: <><path d="M7 18h11a4 4 0 0 0 .4-8A6.5 6.5 0 0 0 6 9a4.5 4.5 0 0 0 1 9Z" /><path d="M10 21l-1 2m7-2-1 2" /></>,
    trust: <><path d="M12 21s-8-4.6-8-10a4.4 4.4 0 0 1 8-2.5A4.4 4.4 0 0 1 20 11c0 5.4-8 10-8 10Z" /><path d="m9 13 2 2 4-4" /></>,
    home: <><path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9Z" /><path d="M9 21v-7h6v7" /></>,
  };
  return <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[icon]}</svg>;
}

function TiltCard({ card, index }: { card: AccountabilityCard; index: number }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(x, { stiffness: 120, damping: 18 });
  const move = (event: PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - box.left - box.width / 2) / box.width * 8);
    y.set(-(event.clientY - box.top - box.height / 2) / box.height * 8);
  };
  return <motion.article className="account-card glass" style={{ rotateX, rotateY }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }} initial={{ opacity: 0, x: reduced ? 0 : index % 2 ? 35 : -35, y: 18 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .85, delay: index * .12, ease: [0.22, 1, .36, 1] }}>
    <div className="card-topline"><span>0{index + 1}</span><CardIcon icon={card.icon} /></div><h3 className="display">{card.title}</h3><p>{card.body}</p>
  </motion.article>;
}

export default function Scene3Accountability() {
  return <SceneWrapper id="accountability" className="accountability-scene"><div className="scene-inner">
    <span className="eyebrow scene-index">{content.accountability.eyebrow}</span><h2 className="display section-title">{content.accountability.title}</h2>
    <div className="account-grid"><span className="connecting-line" />{content.accountability.cards.map((card, index) => <TiltCard key={card.title} card={card} index={index} />)}</div>
  </div></SceneWrapper>;
}
