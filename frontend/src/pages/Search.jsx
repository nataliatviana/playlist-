import { useEffect, useState } from "react";
import { catalogApi } from "../services/api";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import { SearchIcon } from "../components/Icons";
import Loading from "../components/Loading";
import TrackList from "../components/TrackList";
import { countLabel, errorMessage, normalizeSong } from "../utils/format";

// Pesquisa usa a API RESTful: GET /api/songs?search=...&genre=...
function Search() {
  const [term, setTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    catalogApi
      .genres()
      .then((data) => setGenres(data.genres || []))
      .catch(() => setGenres([]));
  }, []);

  // Espera o usuário parar de digitar por 300 ms antes de consultar a API.
  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const data = await catalogApi.searchSongs({ search: term.trim(), genre });
        if (!cancelled) setSongs((data.songs || []).map(normalizeSong));
      } catch (err) {
        if (!cancelled) setError(errorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [term, genre]);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Buscar</p>
          <h1>O que você quer ouvir?</h1>
        </div>
      </header>

      <div className="search-box">
        <SearchIcon size={20} />
        <input
          type="search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Buscar músicas pelo título"
          aria-label="Buscar músicas"
          autoFocus
        />
      </div>

      {genres.length > 0 && (
        <div className="genre-filters" role="group" aria-label="Filtrar por gênero">
          <button
            type="button"
            className={`genre-chip ${genre === "" ? "selected" : ""}`}
            onClick={() => setGenre("")}
            aria-pressed={genre === ""}
          >
            Todos
          </button>
          {genres.map((item) => (
            <button
              key={item._id}
              type="button"
              className={`genre-chip ${genre === item.name ? "selected" : ""}`}
              onClick={() => setGenre(item.name)}
              aria-pressed={genre === item.name}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}

      <ErrorMessage message={error} />

      {loading ? (
        <Loading label="Buscando..." />
      ) : songs.length > 0 ? (
        <>
          <p className="muted results-count">{countLabel(songs.length, "resultado", "resultados")}</p>
          <TrackList songs={songs} />
        </>
      ) : (
        !error && (
          <EmptyState icon={<SearchIcon size={28} />} title="Nenhuma música encontrada">
            <p>Tente outro termo ou outro gênero.</p>
          </EmptyState>
        )
      )}
    </div>
  );
}

export default Search;
