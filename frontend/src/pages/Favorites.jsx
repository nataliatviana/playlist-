import { Link } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import { useFavorites } from "../hooks/useFavorites";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import { HeartIcon, PlayIcon } from "../components/Icons";
import Loading from "../components/Loading";
import TrackList from "../components/TrackList";
import { countLabel, totalDuration } from "../utils/format";

function Favorites() {
  const player = usePlayer();
  const { favorites, loading, error } = useFavorites();

  if (loading && !favorites.length) return <Loading />;

  const songs = favorites.map((favorite) => favorite.song);

  return (
    <div className="page">
      <header className="playlist-hero">
        <div className="cover cover-xl favorites-cover" aria-hidden="true">
          <HeartIcon size={56} filled />
        </div>
        <div className="playlist-info">
          <p className="eyebrow">Coleção</p>
          <h1>Músicas favoritas</h1>
          <p className="playlist-meta">
            {countLabel(songs.length, "música", "músicas")} · {totalDuration(songs)}
          </p>
        </div>
      </header>

      <ErrorMessage message={error?.message} />

      {songs.length > 0 ? (
        <>
          <div className="playlist-controls">
            <button
              type="button"
              className="play-button large"
              onClick={() => player.play(songs[0], songs)}
              aria-label="Reproduzir favoritas"
            >
              <PlayIcon size={22} />
            </button>
          </div>
          <TrackList songs={songs} />
        </>
      ) : (
        !error && (
          <EmptyState icon={<HeartIcon size={28} />} title="Nenhuma favorita ainda">
            <p>
              Toque no coração de uma música em <Link to="/buscar">Buscar</Link> para guardá-la aqui.
            </p>
          </EmptyState>
        )
      )}
    </div>
  );
}

export default Favorites;
