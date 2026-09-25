import { formatDuration } from "../utils/format";
import AddToPlaylist from "./AddToPlaylist";
import { HeartIcon, PlayIcon, TrashIcon } from "./Icons";
import StarRating from "./StarRating";

function TrackItem({
  song,
  position,
  showAlbum,
  active,
  playing,
  onSelect,
  favorite,
  onToggleFavorite,
  score,
  onRate,
  onRemove,
}) {
  const stop = (handler) => (event) => {
    event.stopPropagation();
    handler();
  };

  return (
    <div
      className={`track ${active ? "active" : ""}`}
      role="row"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => event.key === "Enter" && onSelect()}
    >
      <span className="track-index">
        {playing ? (
          <span className="eq" aria-label="Selecionada">
            <i />
            <i />
            <i />
          </span>
        ) : (
          <>
            <span className="num">{position}</span>
            <PlayIcon size={14} className="play" />
          </>
        )}
      </span>

      <span className="track-main">
        <span className="track-title">{song.title}</span>
        <span className="track-artist">{song.artist?.name || "Artista desconhecido"}</span>
      </span>

      {showAlbum && <span className="col-album track-muted">{song.album?.title || "—"}</span>}

      <span className="col-rating">
        <StarRating value={score} onRate={onRate} />
      </span>

      <span className="col-actions track-actions">
        <button
          type="button"
          className={`icon-button heart ${favorite ? "on" : ""}`}
          onClick={stop(onToggleFavorite)}
          aria-label={favorite ? "Remover das favoritas" : "Favoritar"}
          aria-pressed={favorite}
          title={favorite ? "Remover das favoritas" : "Favoritar"}
        >
          <HeartIcon size={18} filled={favorite} />
        </button>
        <AddToPlaylist song={song} />
        {onRemove && (
          <button
            type="button"
            className="icon-button danger"
            onClick={stop(onRemove)}
            aria-label="Remover da playlist"
            title="Remover da playlist"
          >
            <TrashIcon size={17} />
          </button>
        )}
      </span>

      <span className="col-duration track-muted">{formatDuration(song.duration)}</span>
    </div>
  );
}

export default TrackItem;
