import { useCallback, useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { content } from '../content';

export function useAudio() {
  const howl = useRef<Howl | null>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!content.audio.available) return;
    howl.current = new Howl({ src: [content.audio.src], html5: true, loop: true, volume: 0 });
    return () => { howl.current?.unload(); howl.current = null; };
  }, []);
  const play = useCallback(() => {
    if (!howl.current) return;
    howl.current.play();
    howl.current.fade(0, content.audio.baseVolume, 3000);
    setPlaying(true);
  }, []);
  const toggle = useCallback(() => {
    if (!howl.current) return;
    if (playing) {
      howl.current.fade(content.audio.baseVolume, 0, 700);
      window.setTimeout(() => howl.current?.pause(), 720);
      setPlaying(false);
    } else play();
  }, [play, playing]);
  const swell = useCallback(() => {
    if (!howl.current || !playing) return;
    howl.current.fade(content.audio.baseVolume, Math.min(content.audio.baseVolume + 0.1, 0.4), 1600);
    window.setTimeout(() => howl.current?.fade(Math.min(content.audio.baseVolume + 0.1, 0.4), content.audio.baseVolume, 1600), 4500);
  }, [playing]);
  return { playing, play, toggle, swell, available: content.audio.available };
}
