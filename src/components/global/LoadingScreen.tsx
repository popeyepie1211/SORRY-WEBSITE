import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '../../content';

export default function LoadingScreen({ onReady }: { onReady: () => void }) {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    let active = true;
    const sources = content.memories.photos.map((photo) => photo.src).filter((src): src is string => Boolean(src));
    const tasks: Promise<unknown>[] = [document.fonts.ready];
    sources.forEach((src) => tasks.push(new Promise((resolve) => {
      const image = new Image();
      image.onload = resolve; image.onerror = resolve; image.src = src;
    })));
    let completed = 0;
    tasks.forEach((task) => task.finally(() => {
      completed += 1;
      if (active) setPercent(Math.round(completed / tasks.length * 100));
    }));
    Promise.allSettled(tasks).then(() => { if (active) window.setTimeout(onReady, 350); });
    return () => { active = false; };
  }, [onReady]);
  return <motion.div className="loading-screen" exit={{ opacity: 0 }} transition={{ duration: 0.7 }} aria-label={`${content.ui.loading}: ${percent}%`}>
    <div className="loading-heart-wrap">
      <svg viewBox="0 0 120 112" className="loading-heart" aria-hidden="true">
        <defs><clipPath id="heart-clip"><path d="M60 105C31 86 9 68 9 42 9 24 20 12 36 12c11 0 19 6 24 14 5-8 13-14 24-14 16 0 27 12 27 30 0 26-22 44-51 63Z" /></clipPath></defs>
        <path d="M60 105C31 86 9 68 9 42 9 24 20 12 36 12c11 0 19 6 24 14 5-8 13-14 24-14 16 0 27 12 27 30 0 26-22 44-51 63Z" fill="none" stroke="#F2B8A2" strokeWidth="2" />
        <g clipPath="url(#heart-clip)"><rect x="0" y={110 - percent * 1.08} width="120" height="112" fill="#E8798A" /><path className="liquid-wave" d={`M-20 ${107 - percent * 1.08} Q 10 ${100 - percent * 1.08} 40 ${107 - percent * 1.08} T 100 ${107 - percent * 1.08} T 160 ${107 - percent * 1.08}`} fill="none" stroke="#FFD9A0" strokeWidth="8" /></g>
      </svg>
    </div>
    <p className="eyebrow">{content.ui.loading}</p><span className="loading-percent">{percent}%</span>
  </motion.div>;
}
