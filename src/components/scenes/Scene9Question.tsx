import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Lottie from 'lottie-react';
import { content } from '../../content';
import { heartAnimation } from '../../lib/heartAnimation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SceneWrapper from '../global/SceneWrapper';

export default function Scene9Question({ onYes }: { onYes: () => void }) {
  const [answer, setAnswer] = useState<'yes' | 'time' | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (answer !== 'yes' || reduced) return;
    const heart = confetti.shapeFromText({ text: '♥', scalar: 1.2 });
    const fire = () => {
      confetti({ particleCount: 55, spread: 75, origin: { x: .08, y: 1 }, colors: ['#1E96FC', '#FFC600', '#FCE300'], shapes: [heart, 'circle'], scalar: .85 });
      confetti({ particleCount: 55, spread: 75, origin: { x: .92, y: 1 }, colors: ['#1E96FC', '#FFC600', '#FCE300'], shapes: [heart, 'circle'], scalar: .85 });
      confetti({ particleCount: 25, spread: 360, startVelocity: 18, gravity: .55, origin: { x: .25 + Math.random() * .5, y: .17 + Math.random() * .28 }, colors: ['#A2D6F9', '#FCE300', '#1E96FC'], scalar: .7 });
    };
    fire();
    const interval = window.setInterval(fire, 1050);
    const stop = window.setTimeout(() => window.clearInterval(interval), 5000);
    return () => { window.clearInterval(interval); window.clearTimeout(stop); };
  }, [answer, reduced]);
  return <SceneWrapper id="question" className={`question-scene ${answer === 'yes' ? 'celebrating' : ''}`}><div className="scene-inner question-inner"><span className="eyebrow scene-index">{content.question.eyebrow}</span>
    <AnimatePresence mode="wait">{answer ? <motion.div key={answer} className="answer-panel" initial={{ opacity: 0, scale: .9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.1 }}>
      {answer === 'yes' && <div className="lottie-heart" aria-hidden="true"><Lottie animationData={heartAnimation} loop /></div>}
      <h2 className="display section-title">{answer === 'yes' ? content.question.yesAnswer : content.question.timeAnswer}</h2>{answer === 'yes' && <p className="font-hand final-line">{content.question.finalLine}</p>}
    </motion.div> : <motion.div key="question" exit={{ opacity: 0, scale: 1.1 }} className="question-panel"><div className="question-sun" aria-hidden="true" /><h2 className="display section-title">{content.question.title}</h2><div className="question-actions"><motion.button className="pill-button primary yes-button" onClick={() => { setAnswer('yes'); onYes(); }} whileHover={{ scale: 1.06 }} whileTap={{ scale: .96 }}>{content.question.yes}</motion.button><button className="pill-button secondary" onClick={() => setAnswer('time')}>{content.question.time}</button></div></motion.div>}</AnimatePresence>
  </div></SceneWrapper>;
}
