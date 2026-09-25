// A duração das músicas é armazenada em segundos no backend.
export function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return "--:--";
  const minutes = Math.floor(seconds / 60);
  const rest = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${minutes}:${rest}`;
}

export function totalDuration(songs = []) {
  return formatDuration(songs.reduce((sum, song) => sum + (song?.duration || 0), 0));
}

export function countLabel(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export const VISIBILITY_LABELS = {
  private: "Privada",
  public: "Pública",
  collaborative: "Colaborativa",
};

// A API REST devolve documentos do Mongoose (_id); a GraphQL devolve id.
// Normalizamos para que os componentes trabalhem com um único formato.
export function normalizeSong(song) {
  const withId = (item) => (item ? { ...item, id: item.id || item._id } : null);

  return {
    id: song.id || song._id,
    title: song.title,
    duration: song.duration,
    artist: withId(song.artist),
    album: withId(song.album),
    genre: withId(song.genre),
  };
}

// Gera uma cor de capa estável a partir do nome, já que não há imagens de capa.
export function coverGradient(seed = "") {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  const hue = hash;
  return `linear-gradient(135deg, hsl(${hue} 55% 42%), hsl(${(hue + 50) % 360} 60% 22%))`;
}

export function errorMessage(error) {
  return error?.message || "Algo deu errado. Tente novamente.";
}
