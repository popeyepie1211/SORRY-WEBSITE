import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content, Photo } from '../../content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);
const photos = content.memories.photos;

function PhotoVisual({ photo, index, modal = false }: { photo: Photo; index: number; modal?: boolean }) {
  return photo.src ? <motion.img layoutId={`memory-photo-${index}`} src={photo.src} srcSet={photo.srcSet} sizes={modal ? '90vw' : '(max-width: 700px) 72vw, 420px'} alt={photo.alt} loading={modal ? 'eager' : 'lazy'} decoding="async" style={{ objectPosition: photo.focalPoint }} /> : <motion.div layoutId={`memory-photo-${index}`} className="photo-placeholder"><span>✦</span><strong>{content.ui.photoPlaceholder}</strong><small>{String(index + 1).padStart(2, '0')}</small></motion.div>;
}

export default function Scene5Memories() {
  const pin = useRef<HTMLDivElement>(null); const track = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    if (!pin.current || !track.current || reduced) return;
    const context = gsap.context(() => {
      const distance = () => Math.max(0, track.current!.scrollWidth - pin.current!.clientWidth + 100);
      if (distance() < 30) return;
      gsap.to(track.current, { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: pin.current, start: 'top top', end: () => `+=${distance() * 1.25}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
    }, pin);
    return () => context.revert();
  }, [reduced]);
  useEffect(() => {
    if (selected === null) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'ArrowRight') setSelected((n) => (n! + 1) % photos.length);
      if (event.key === 'ArrowLeft') setSelected((n) => (n! - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [selected]);
  return <section id="memories" className="scene memories-scene">
    <div className="scene-inner memories-intro"><span className="eyebrow scene-index">{content.memories.eyebrow}</span><h2 className="display section-title">{content.memories.title}</h2><p>{content.memories.intro}</p></div>
    <div ref={pin} className="gallery-pin"><div className="gallery-fade" /><div ref={track} className="gallery-track">
      {photos.map((photo, index) => <motion.button key={`${photo.src}-${index}`} className="polaroid" onClick={() => setSelected(index)} style={{ rotate: `${[-5, 3, -2, 5, -4][index % 5]}deg` }} whileHover={{ rotate: 0, y: -12, scale: 1.02 }} transition={{ type: 'spring', stiffness: 120, damping: 18 }} aria-label={`${photo.alt}. ${content.ui.photoOpen}`}>
        <span className="tape" /><span className="polaroid-image"><PhotoVisual photo={photo} index={index} /></span><span className="polaroid-caption">{photo.caption}</span>{photo.date && <span className="polaroid-date">{photo.date}</span>}
      </motion.button>)}
    </div></div>
    <div className="solo-section"><div className="solo-backdrop">{content.memories.soloPhotos[0]?.src ? <img src={content.memories.soloPhotos[0].src} alt={content.memories.soloPhotos[0].alt} loading="lazy" /> : <div className="solo-placeholder"><span>✦</span><small>{content.ui.photoPlaceholder}</small></div>}</div><div className="solo-copy"><span className="eyebrow">{content.memories.soloTitle}</span><p className="display">{content.memories.soloLine}</p></div></div>
    <AnimatePresence>{selected !== null && <motion.div className="photo-modal" role="dialog" aria-modal="true" aria-label={photos[selected].alt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
      <button className="photo-modal-close" onClick={() => setSelected(null)} aria-label={content.ui.close}>×</button>
      <motion.div className="photo-modal-body" drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={.4} onDragEnd={(_, info) => { if (info.offset.y > 100) setSelected(null); else if (info.offset.x < -80) setSelected((selected + 1) % photos.length); else if (info.offset.x > 80) setSelected((selected - 1 + photos.length) % photos.length); }} onClick={(event) => event.stopPropagation()}><PhotoVisual photo={photos[selected]} index={selected} modal /><p className="font-hand">{photos[selected].caption}</p></motion.div>
      <div className="modal-nav"><button onClick={(event) => { event.stopPropagation(); setSelected((selected - 1 + photos.length) % photos.length); }} aria-label={content.ui.photoPrevious}>←</button><span>{selected + 1} / {photos.length}</span><button onClick={(event) => { event.stopPropagation(); setSelected((selected + 1) % photos.length); }} aria-label={content.ui.photoNext}>→</button></div>
    </motion.div>}</AnimatePresence>
  </section>;
}
