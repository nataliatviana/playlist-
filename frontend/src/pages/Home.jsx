import { Link, useOutletContext } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_AVALIACOES, GET_FAVORITOS, GET_MINHAS_PLAYLISTS, GET_MUSICAS } from "../graphql/queries";
import { useAuth } from "../context/AuthContext";
import Cover from "../components/Cover";
import ErrorMessage from "../components/ErrorMessage";
import { PlusIcon } from "../components/Icons";
import Loading from "../components/Loading";
import TrackList from "../components/TrackList";
import { countLabel, VISIBILITY_LABELS } from "../utils/format";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

// Início = dashboard do usuário: resumo, playlists e músicas do catálogo.
function Home() {
  const { user } = useAuth();
  const { openNewPlaylist } = useOutletContext();
  const playlistsQuery = useQuery(GET_MINHAS_PLAYLISTS);
  const musicasQuery = useQuery(GET_MUSICAS);
  const favoritosQuery = useQuery(GET_FAVORITOS);
  const avaliacoesQuery = useQuery(GET_AVALIACOES);

  if (playlistsQuery.loading && !playlistsQuery.data) return <Loading />;

  const playlists = playlistsQuery.data?.minhasPlaylists || [];
  const musicas = musicasQuery.data?.musicas || [];

  const stats = [
    { label: "Playlists", value: playlists.length },
    { label: "Favoritas", value: favoritosQuery.data?.favoritos?.length ?? "–" },
    { label: "Avaliações", value: avaliacoesQuery.data?.avaliacoes?.length ?? "–" },
    { label: "No catálogo", value: musicasQuery.data ? musicas.length : "–" },
  ];

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Início</p>
          <h1>
            {greeting()}, {user?.name?.split(" ")[0]}
          </h1>
        </div>
      </header>

      <ErrorMessage message={playlistsQuery.error?.message} />

      <section className="stats" aria-label="Resumo">
        {stats.map((stat) => (
          <div key={stat.label} className="stat">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Suas playlists</h2>
        </div>
        <div className="playlist-grid">
          {playlists.map((playlist) => (
            <Link key={playlist.id} to={`/playlist/${playlist.id}`} className="playlist-card">
              <Cover seed={playlist.name} size="fill" />
              <strong>{playlist.name}</strong>
              <span>
                {VISIBILITY_LABELS[playlist.visibility] || "Privada"} ·{" "}
                {countLabel(playlist.songs?.length || 0, "música", "músicas")}
              </span>
            </Link>
          ))}
          <button type="button" className="playlist-card new" onClick={openNewPlaylist}>
            <span className="new-cover">
              <PlusIcon size={32} />
            </span>
            <strong>Nova playlist</strong>
            <span>Crie e organize</span>
          </button>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Do catálogo</h2>
          <Link to="/buscar" className="link">
            Ver tudo
          </Link>
        </div>
        {musicasQuery.loading && <Loading />}
        <ErrorMessage message={musicasQuery.error?.message} />
        {musicas.length > 0 && <TrackList songs={musicas.slice(0, 6)} />}
        {musicasQuery.data && musicas.length === 0 && (
          <p className="muted">Nenhuma música cadastrada no catálogo ainda.</p>
        )}
      </section>
    </div>
  );
}

export default Home;
