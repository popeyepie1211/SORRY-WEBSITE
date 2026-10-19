import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { content } from '../../content';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SceneWrapper from '../global/SceneWrapper';

export default function Scene7Heartbeat() {
  const [beats, setBeats] = useState(0); const [secret, setSecret] = useState(false); const [vibrate, setVibrate] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!vibrate || reduced || !('vibrate' in navigator)) return;
    navigator.vibrate([40, 120, 40]);
    const timer = window.setInterval(() => navigator.vibrate([40, 120, 40]), 2200);
    return () => { window.clearInterval(timer); navigator.vibrate(0); };
  }, [vibrate, reduced]);
  return <SceneWrapper id="heartbeat" className="heartbeat-scene"><div className="scene-inner heartbeat-inner"><span className="eyebrow scene-index">{content.heartbeat.eyebrow}</span>
    <div className="heartbeat-stage"><div className="heart-ring" /><button className="hero-heart" aria-label={content.ui.heartSecretHint} onClick={() => { setBeats((n) => n + 1); if (beats + 1 >= 5) { setSecret(true); setBeats(0); } }}><span>♥</span></button></div>
    <div className="heartbeat-lines">{content.heartbeat.lines.map((line, index) => <motion.p className="display" key={line} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .9, delay: reduced ? 0 : index * 1.6 }}>{line}</motion.p>)}</div>
    {'vibrate' in navigator && <button className="quiet-link" onClick={() => setVibrate((v) => !v)} aria-pressed={vibrate}>{vibrate ? content.ui.vibrationOff : content.ui.pause}</button>}
    <div className="floating-petals" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <span key={i} style={{ left: `${8 + i * 9}%`, animationDelay: `${i * -.73}s` }}>{i % 3 === 0 ? '♥' : '✦'}</span>)}</div>
    <AnimatePresence>{secret && <motion.div className="secret-modal" role="dialog" aria-modal="true" aria-label={content.ui.hiddenMessage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSecret(false)}><div className="secret-paper glass" onClick={(event) => event.stopPropagation()}><button onClick={() => setSecret(false)} aria-label={content.ui.close}>×</button><p className="font-hand">{content.heartbeat.secret}</p></div></motion.div>}</AnimatePresence>
  </div></SceneWrapper>;
}
