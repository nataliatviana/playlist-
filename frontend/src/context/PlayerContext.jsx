import { createContext, useCallback, useContext, useMemo, useState } from "react";

// Player apenas ILUSTRATIVO: guarda qual faixa está "selecionada" para o
// rodapé, mas nenhum áudio é reproduzido (streaming está fora do escopo).
const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const [index, setIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const current = index >= 0 ? queue[index] : null;

  const play = useCallback((song, list = [song]) => {
    const position = list.findIndex((item) => item.id === song.id);
    setQueue(list);
    setIndex(position >= 0 ? position : 0);
    setIsPlaying(true);
  }, []);

  const toggle = useCallback(() => {
    if (current) setIsPlaying((playing) => !playing);
  }, [current]);

  const next = useCallback(() => {
    setIndex((i) => (queue.length ? (i + 1) % queue.length : i));
  }, [queue.length]);

  const previous = useCallback(() => {
    setIndex((i) => (queue.length ? (i - 1 + queue.length) % queue.length : i));
  }, [queue.length]);

  const value = useMemo(
    () => ({ current, isPlaying, play, toggle, next, previous }),
    [current, isPlaying, play, toggle, next, previous]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  return useContext(PlayerContext);
}
