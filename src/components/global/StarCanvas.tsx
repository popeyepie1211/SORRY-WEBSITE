import { useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

function StarField({ count }: { count: number }) {
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) { array[i * 3] = (Math.random() - 0.5) * 18; array[i * 3 + 1] = (Math.random() - 0.5) * 12; array[i * 3 + 2] = (Math.random() - 0.5) * 3; }
    return array;
  }, [count]);
  const [stars, setStars] = useState<import('three').Points | null>(null);
  useFrame((state) => { if (stars) stars.rotation.z = Math.sin(state.clock.elapsedTime * 0.025) * 0.025; });
  return <Points ref={setStars} positions={positions} stride={3} frustumCulled={false}><PointMaterial transparent color="#fff1e4" size={0.028} sizeAttenuation depthWrite={false} opacity={0.75} /></Points>;
}

export default function StarCanvas({ mobile, visible }: { mobile: boolean; visible: boolean }) {
  return <Canvas dpr={[1, mobile ? 1.3 : 2]} frameloop={visible ? 'always' : 'never'} gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}><StarField count={mobile ? 70 : 145} /></Canvas>;
}
