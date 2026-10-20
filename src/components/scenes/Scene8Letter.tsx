import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { content } from '../../content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function Scene8Letter({ onOpen }: { onOpen: () => void }) {
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { amount: .55, once: true });
  const [open, setOpen] = useState(false); const [typed, setTyped] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => { if (inView) setOpen(true); }, [inView]);
  useEffect(() => { if (open) onOpen(); }, [open, onOpen]);
  useEffect(() => {
    if (!open) return;
    if (reduced) { setTyped(content.letter.text.length); return; }
    if (typed >= content.letter.text.length) return;
    const previous = content.letter.text[typed - 1];
    const delay = previous === '.' || previous === ',' ? 180 : previous === '\n' ? 280 : 12 + (typed * 13 % 16);
    const timer = window.setTimeout(() => setTyped(typed + 1), delay);
    return () => window.clearTimeout(timer);
  }, [open, typed, reduced]);
  return <section ref={section} id="letter" className="scene letter-scene"><div className="scene-inner letter-inner"><span className="eyebrow scene-index">{content.letter.eyebrow}</span><h2 className="display section-title">{content.letter.title}</h2>
    <div className={`envelope-stage ${open ? 'is-open' : ''}`}><motion.div className="envelope" animate={open ? { y: 70, opacity: 0, scale: .9 } : { y: 0, opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: .45 }} aria-hidden={open}>
      <div className="envelope-back" /><div className="envelope-flap" /><div className="envelope-front" /><button className="wax-seal" onClick={() => setOpen(true)} aria-label={content.ui.openLetter}>{content.letter.seal}</button>
    </motion.div>
      <AnimatePresence>{open && <motion.article className="letter-paper" initial={{ opacity: 0, y: 110, rotateX: -35, scale: .75 }} animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }} transition={{ duration: 1.25, delay: .4, ease: [0.22, 1, .36, 1] }}>
        <div className="paper-rule" /><div className="letter-scroll" role="region" aria-label={content.ui.letterRegion} tabIndex={0}><p className="letter-text font-hand" aria-live="polite">{content.letter.text.slice(0, typed)}{typed < content.letter.text.length && <span className="typing-caret" aria-hidden="true">|</span>}</p>
          {typed >= content.letter.text.length && <motion.svg className="signature-svg" viewBox="0 0 230 95" fill="none" aria-label={content.letter.signature} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><motion.path d="M17 69 C27 48 44 13 55 18 C68 23 46 56 42 68 M28 49 C47 53 59 50 65 45 M71 65 C81 47 85 37 91 42 C96 47 77 69 89 64 C100 60 110 42 119 43 C125 44 108 68 118 64 C127 61 139 51 145 44 M145 44 C153 55 157 64 169 66 M159 66 C170 53 178 41 186 42 C194 44 180 67 192 64 C201 62 209 54 217 50" stroke="#5E3838" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.6, ease: 'easeInOut' }} /></motion.svg>}
        </div><button className="show-full-letter" onClick={() => setTyped(content.letter.text.length)}>{content.ui.showLetter}</button>
      </motion.article>}</AnimatePresence>
    </div>
  </div></section>;
}
