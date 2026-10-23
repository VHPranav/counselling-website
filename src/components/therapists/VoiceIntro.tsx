"use client";

import { useId, useRef, useState, useEffect } from "react";

const bars = [7, 11, 6, 14, 19, 9, 24, 15, 30, 20, 13, 25, 17, 10, 22, 14, 28, 18, 11, 24, 16, 8, 19, 13, 23, 15, 9, 17, 11, 6];
const time = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

/** Recordings are optional: absent audio is an honest, disabled preview. */
export function VoiceIntro({ src, name }: { src?: string; name: string }) {
  const id = useId();
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const pauseOthers = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== id) audio.current?.pause();
    };
    window.addEventListener("thanal:voice-intro", pauseOthers);
    return () => { window.removeEventListener("thanal:voice-intro", pauseOthers); };
  }, [id]);
  async function toggle() {
    if (!audio.current) return;
    if (!audio.current.paused) { audio.current.pause(); return; }
    window.dispatchEvent(new CustomEvent("thanal:voice-intro", { detail: id }));
    try { await audio.current.play(); } catch { setFailed(true); }
  }
  return (
    <div className="voice-intro">
      <button type="button" onClick={() => void toggle()} disabled={!src || failed} aria-label={!src ? `Voice introduction for ${name} coming soon` : `${playing ? "Pause" : "Play"} voice introduction by ${name}`} aria-pressed={playing} className="voice-intro-play">
        <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">{playing ? <path d="M5 4h3v12H5zm7 0h3v12h-3z" fill="currentColor" /> : <path d="m6 3 11 7-11 7z" fill="currentColor" />}</svg>
      </button>
      <div className="voice-intro-track">
        <div className="voice-intro-wave" aria-hidden="true">{bars.map((height, i) => <span key={i} style={{ height, opacity: src && duration && current / duration > i / bars.length ? 1 : 0.3 }} />)}</div>
        {src && duration > 0 ? <input className="voice-intro-seek" type="range" min={0} max={duration} step={0.1} value={current} aria-label={`Seek voice introduction by ${name}`} aria-valuetext={`${time(current)} of ${time(duration)}`} onChange={(event) => { const value = Number(event.target.value); if (audio.current) audio.current.currentTime = value; setCurrent(value); }} /> : null}
      </div>
      <span className="voice-intro-caption">{!src ? "Coming soon" : `${time(current)} / ${time(duration)}`}</span>
      {src ? <audio ref={audio} src={src} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onTimeUpdate={() => setCurrent(audio.current?.currentTime ?? 0)} onLoadedMetadata={() => setDuration(Number.isFinite(audio.current?.duration) ? audio.current!.duration : 0)} onError={() => setFailed(true)} /> : null}
      {failed ? <span className="sr-only" role="status">The voice introduction could not be loaded.</span> : null}
    </div>
  );
}
