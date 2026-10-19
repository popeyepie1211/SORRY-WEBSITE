import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
type Particle = { id: number; x: number; y: number; icon: string };
export default function CursorTrail() {
  const reduced = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    if (reduced) return;
    let last = 0; let id = 0;
    const add = (x: number, y: number, icon: string) => {
      const next = ++id;
      setParticles((current) => [...current.slice(-10), { id: next, x, y, icon }]);
      window.setTimeout(() => setParticles((current) => current.filter((particle) => particle.id !== next)), 850);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || Date.now() - last < 85) return;
      last = Date.now(); add(event.clientX, event.clientY, id % 3 === 0 ? '♥' : '✦');
    };
    const tap = (event: PointerEvent) => { if (event.pointerType !== 'mouse') add(event.clientX, event.clientY, '♥'); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerdown', tap);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerdown', tap); };
  }, [reduced]);
  return <div className="cursor-trail" aria-hidden="true">{particles.map((particle) => <span key={particle.id} style={{ left: particle.x, top: particle.y }}>{particle.icon}</span>)}</div>;
}
