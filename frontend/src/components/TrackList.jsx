import { usePlayer } from "../context/PlayerContext";
import { useToast } from "../context/ToastContext";
import { useFavorites } from "../hooks/useFavorites";
import { useRatings } from "../hooks/useRatings";
import { errorMessage } from "../utils/format";
import { ClockIcon } from "./Icons";
import TrackItem from "./TrackItem";

// Tabela de faixas usada em Playlist, Buscar e Favoritas.
// Favoritos e avaliações são carregados uma vez aqui e repassados às linhas.
function TrackList({ songs, onRemove, showAlbum = true }) {
  const player = usePlayer();
  const showToast = useToast();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { scoreOf, rate } = useRatings();

  const run = (action) => async (...args) => {
    try {
      await action(...args);
    } catch (error) {
      showToast(errorMessage(error), "error");
    }
  };

  return (
    <div className={`tracklist ${showAlbum ? "" : "no-album"}`} role="table">
      <div className="track-head" role="row">
        <span role="columnheader">#</span>
        <span role="columnheader">Título / Artista</span>
        {showAlbum && <span role="columnheader" className="col-album">Álbum</span>}
        <span role="columnheader" className="col-rating">Avaliação</span>
        <span role="columnheader" className="col-actions" aria-label="Ações" />
        <span role="columnheader" className="col-duration" aria-label="Duração" title="Duração">
          <ClockIcon size={16} />
        </span>
      </div>

      {songs.map((song, index) => (
        <TrackItem
          key={song.id}
          song={song}
          position={index + 1}
          showAlbum={showAlbum}
          active={player.current?.id === song.id}
          playing={player.current?.id === song.id && player.isPlaying}
          onSelect={() => player.play(song, songs)}
          favorite={isFavorite(song.id)}
          onToggleFavorite={run(() => toggleFavorite(song.id))}
          score={scoreOf(song.id)}
          onRate={run((score) => rate(song.id, score))}
          onRemove={onRemove ? () => onRemove(song) : null}
        />
      ))}
    </div>
  );
}

export default TrackList;
