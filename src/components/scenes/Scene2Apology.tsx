import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from '../../content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Scene2Apology() {
  const section = useRef<HTMLElement>(null);
  const heading = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    if (!section.current || reduced) return;
    const context = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.apology-word');
      gsap.fromTo(words, { opacity: .22, filter: 'blur(2px)' }, { opacity: 1, filter: 'blur(0px)', stagger: .07, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top 70%', end: 'bottom 80%', scrub: true } });
      if (window.innerWidth > 900 && heading.current) ScrollTrigger.create({ trigger: section.current, start: 'top top', end: 'bottom bottom', pin: heading.current, pinSpacing: false });
    }, section);
    return () => context.revert();
  }, [reduced]);
  return <section ref={section} id="apology" className="scene apology-scene"><div className="scene-inner apology-layout">
    <div ref={heading} className="apology-heading"><span className="eyebrow scene-index">{content.apology.eyebrow}</span><h2 className="display giant-title shimmer-text">{content.apology.title}</h2><span className="apology-rule" /></div>
    <div className="apology-copy">{content.apology.paragraphs.map((paragraph, i) => <p key={i}>{paragraph.split(/(\s+)/).map((word, j) => /\s+/.test(word) ? word : <span className="apology-word" key={j}>{word}</span>)}</p>)}</div>
  </div></section>;
}
