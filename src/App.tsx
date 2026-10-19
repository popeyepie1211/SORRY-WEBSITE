import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, useScroll } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAudio } from './hooks/useAudio';
import { useReducedMotion } from './hooks/useReducedMotion';
import LoadingScreen from './components/global/LoadingScreen';
import IntroGate from './components/global/IntroGate';
import SkyBackground from './components/global/SkyBackground';
import GroundGarden from './components/global/GroundGarden';
import ScrollProgress from './components/global/ScrollProgress';
import MusicToggle from './components/global/MusicToggle';
import CursorTrail from './components/global/CursorTrail';
import Scene1Opening from './components/scenes/Scene1Opening';
import Scene2Apology from './components/scenes/Scene2Apology';
import Scene3Accountability from './components/scenes/Scene3Accountability';
import Scene4Growth from './components/scenes/Scene4Growth';

const Scene5Memories = lazy(() => import('./components/scenes/Scene5Memories'));
const Scene6Reasons = lazy(() => import('./components/scenes/Scene6Reasons'));
const Scene7Heartbeat = lazy(() => import('./components/scenes/Scene7Heartbeat'));
const Scene8Letter = lazy(() => import('./components/scenes/Scene8Letter'));
const Scene9Question = lazy(() => import('./components/scenes/Scene9Question'));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [gate, setGate] = useState(true);
  const [celebrate, setCelebrate] = useState(false);
  const { scrollYProgress } = useScroll();
  const audio = useAudio(); const reduced = useReducedMotion();
  const ready = useCallback(() => setLoading(false), []);
  useEffect(() => { document.body.classList.toggle('locked', loading || gate); return () => document.body.classList.remove('locked'); }, [loading, gate]);
  useEffect(() => {
    if (loading || gate || reduced) return;
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true, touchMultiplier: 1.1 });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const sky = gsap.to(document.documentElement, { '--sky-warmth': 1, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: true } });
    ScrollTrigger.refresh();
    return () => { sky.kill(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, [loading, gate, reduced]);
  return <>
    <SkyBackground /><GroundGarden progress={scrollYProgress} celebrate={celebrate} /><ScrollProgress progress={scrollYProgress} /><CursorTrail />
    <main id="main-content"><Scene1Opening /><Scene2Apology /><Scene3Accountability /><Scene4Growth />
      <Suspense fallback={<div className="scene-loading" aria-hidden="true" />}><Scene5Memories /><Scene6Reasons /><Scene7Heartbeat /><Scene8Letter onOpen={audio.swell} /><Scene9Question onYes={() => setCelebrate(true)} /></Suspense>
    </main>
    {!gate && <MusicToggle playing={audio.playing} available={audio.available} onToggle={audio.toggle} />}
    <AnimatePresence>{loading && <LoadingScreen onReady={ready} />}</AnimatePresence>
    <AnimatePresence>{!loading && gate && <IntroGate onBegin={() => { audio.play(); setGate(false); }} />}</AnimatePresence>
  </>;
}
