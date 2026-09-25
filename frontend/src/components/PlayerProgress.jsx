import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../utils/format";

// Tempo simulado: avança 1 s por segundo enquanto "tocando".
// O PlayerBar remonta este componente (key) a cada troca de faixa, zerando o tempo.
function PlayerProgress({ duration, isPlaying, onEnd }) {
  const [elapsed, setElapsed] = useState(0);
  const elapsedRef = useRef(0);

  useEffect(() => {
    if (!isPlaying || !duration) return;

    const timer = setInterval(() => {
      elapsedRef.current += 1;
      if (elapsedRef.current >= duration) {
        elapsedRef.current = 0;
        onEnd();
      }
      setElapsed(elapsedRef.current);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, duration, onEnd]);

  const progress = duration ? (elapsed / duration) * 100 : 0;

  return (
    <div className="player-progress">
      <span>{formatDuration(elapsed)}</span>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <span>{formatDuration(duration)}</span>
    </div>
  );
}

export default PlayerProgress;
