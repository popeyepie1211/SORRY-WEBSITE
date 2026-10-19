import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '../../content';
import SceneWrapper from '../global/SceneWrapper';

function TimeTogether() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const timer = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(timer); }, []);
  const date = content.reasons.anniversaryDate;
  if (!date) return <p className="anniversary-prompt">{content.ui.addAnniversary}</p>;
  const elapsed = Math.max(0, now - new Date(`${date}T00:00:00`).getTime());
  const days = Math.floor(elapsed / 86400000); const hours = Math.floor(elapsed / 3600000) % 24; const minutes = Math.floor(elapsed / 60000) % 60; const seconds = Math.floor(elapsed / 1000) % 60;
  return <div className="anniversary-counter"><strong key={days}>{days.toLocaleString()}</strong><span>{content.ui.days}</span><div className="clock-units"><span>{String(hours).padStart(2, '0')} h</span><span>{String(minutes).padStart(2, '0')} m</span><span>{String(seconds).padStart(2, '0')} s</span></div></div>;
}

export default function Scene6Reasons() {
  const [flipped, setFlipped] = useState<number[]>([]);
  const toggle = (index: number) => setFlipped((items) => items.includes(index) ? items.filter((n) => n !== index) : [...items, index]);
  return <SceneWrapper id="reasons" className="reasons-scene"><div className="scene-inner">
    <span className="eyebrow scene-index">{content.reasons.eyebrow}</span><h2 className="display section-title">{content.reasons.title}</h2>
    <div className="constellation"><svg viewBox="0 0 100 100" preserveAspectRatio="none" className="constellation-lines" aria-hidden="true"><path d="M15 19 50 10 82 22 68 56 88 84 43 88 18 68 15 19 68 56 50 10 43 88" fill="none" stroke="#FFD9A0" strokeWidth=".3" strokeDasharray="1 1.5" opacity={flipped.length ? .8 : .35} /></svg>
      {content.reasons.cards.map((reason, index) => <motion.button key={reason.front} className={`reason-card ${flipped.includes(index) ? 'flipped' : ''}`} onClick={() => toggle(index)} aria-pressed={flipped.includes(index)} aria-label={`${reason.front}. ${content.ui.flipReason}`} whileHover={{ y: -8 }} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}><span className="reason-card-inner"><span className="reason-face glass"><span className="reason-star">✧</span><strong className="display">{reason.front}</strong><small>{content.ui.flipReason}</small></span><span className="reason-face reason-back glass"><span className="reason-star">♥</span><span>{reason.back}</span></span></span></motion.button>)}
    </div><TimeTogether />
  </div></SceneWrapper>;
}
