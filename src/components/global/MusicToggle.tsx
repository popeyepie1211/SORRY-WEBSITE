import { content } from '../../content';
export default function MusicToggle({ playing, available, onToggle }: { playing: boolean; available: boolean; onToggle: () => void }) {
  return <button className={`music-toggle glass ${playing ? 'is-playing' : ''}`} onClick={onToggle} disabled={!available} aria-label={available ? (playing ? content.ui.musicOn : content.ui.musicOff) : content.ui.musicUnavailable} title={available ? (playing ? content.ui.musicOn : content.ui.musicOff) : content.ui.musicUnavailable}>
    <span className="equalizer" aria-hidden="true"><i /><i /><i /><i /></span><span className="music-label">{available ? (playing ? content.ui.musicOnLabel : content.ui.musicOffLabel) : '♪'}</span>
  </button>;
}
