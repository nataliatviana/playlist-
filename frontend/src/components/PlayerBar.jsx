import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { useFavorites } from "../hooks/useFavorites";
import Cover from "./Cover";
import PlayerProgress from "./PlayerProgress";
import {
  HeartIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  RepeatIcon,
  ShuffleIcon,
  VolumeIcon,
} from "./Icons";

// Player fixo no rodapé — ILUSTRATIVO. Nenhum áudio é tocado:
// o tempo só avança visualmente para simular a reprodução.
function PlayerBar() {
  const { current, isPlaying, toggle, next, previous } = usePlayer();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [volume, setVolume] = useState(70);

  if (!current) {
    return (
      <footer className="player player-idle">
        <p>Selecione uma música para exibir aqui.</p>
      </footer>
    );
  }

  const favorite = isFavorite(current.id);

  return (
    <footer className="player">
      <div className="player-song">
        <Cover seed={current.album?.title || current.title} size="md" />
        <div className="player-meta">
          <strong>{current.title}</strong>
          <span>{current.artist?.name}</span>
        </div>
        <button
          type="button"
          className={`icon-button heart ${favorite ? "on" : ""}`}
          onClick={() => toggleFavorite(current.id).catch(() => {})}
          aria-label={favorite ? "Remover das favoritas" : "Favoritar"}
          aria-pressed={favorite}
        >
          <HeartIcon size={18} filled={favorite} />
        </button>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button type="button" className="icon-button desktop-only" aria-label="Aleatório">
            <ShuffleIcon size={16} />
          </button>
          <button type="button" className="icon-button" onClick={previous} aria-label="Anterior">
            <PrevIcon size={16} />
          </button>
          <button
            type="button"
            className="play-button"
            onClick={toggle}
            aria-label={isPlaying ? "Pausar" : "Reproduzir"}
          >
            {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
          </button>
          <button type="button" className="icon-button" onClick={next} aria-label="Próxima">
            <NextIcon size={16} />
          </button>
          <button type="button" className="icon-button desktop-only" aria-label="Repetir">
            <RepeatIcon size={16} />
          </button>
        </div>
        <PlayerProgress
          key={current.id}
          duration={current.duration || 0}
          isPlaying={isPlaying}
          onEnd={next}
        />
      </div>

      <div className="player-volume desktop-only">
        <VolumeIcon size={18} />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          aria-label="Volume"
          style={{ "--value": `${volume}%` }}
        />
      </div>
    </footer>
  );
}

export default PlayerBar;
