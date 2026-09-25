import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_MINHAS_PLAYLISTS, GET_PLAYLIST } from "../graphql/queries";
import { EXCLUIR_PLAYLIST, REMOVER_MUSICA_PLAYLIST } from "../graphql/mutations";
import { useAuth } from "../context/AuthContext";
import { usePlayer } from "../context/PlayerContext";
import { useToast } from "../context/ToastContext";
import Collaborators from "../components/Collaborators";
import Cover from "../components/Cover";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import { EditIcon, PlayIcon, SearchIcon, ShuffleIcon, TrashIcon, UsersIcon } from "../components/Icons";
import Loading from "../components/Loading";
import PlaylistForm from "../components/PlaylistForm";
import TrackList from "../components/TrackList";
import { countLabel, errorMessage, totalDuration, VISIBILITY_LABELS } from "../utils/format";

function PlaylistDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const player = usePlayer();
  const showToast = useToast();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [showCollaborators, setShowCollaborators] = useState(false);

  const { data, loading, error } = useQuery(GET_PLAYLIST, { variables: { id } });
  const refetchQueries = [
    { query: GET_PLAYLIST, variables: { id } },
    { query: GET_MINHAS_PLAYLISTS },
  ];
  const [removerMusica] = useMutation(REMOVER_MUSICA_PLAYLIST, { refetchQueries });
  const [excluirPlaylist] = useMutation(EXCLUIR_PLAYLIST, {
    refetchQueries: [{ query: GET_MINHAS_PLAYLISTS }],
  });

  if (loading && !data) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  const playlist = data?.playlist;
  if (!playlist) return <ErrorMessage message="Playlist não encontrada." />;

  const isOwner = playlist.owner?.id === user?.id;
  const isCollaborator = playlist.collaborators?.some((collaborator) => collaborator.id === user?.id);
  const canManageSongs = isOwner || (playlist.visibility === "collaborative" && isCollaborator);

  // Mesma regra de visibilidade do escopo: privada só para dono/colaboradores.
  if (playlist.visibility === "private" && !isOwner && !isCollaborator) {
    return (
      <div className="page">
        <EmptyState title="Playlist privada">
          <p>Somente o dono pode ver esta playlist.</p>
        </EmptyState>
      </div>
    );
  }

  const songs = (playlist.songs || []).filter(Boolean);

  const handleRemove = async (song) => {
    try {
      await removerMusica({ variables: { playlistId: playlist.id, musicaId: song.id } });
      showToast(`"${song.title}" removida da playlist.`);
    } catch (err) {
      showToast(errorMessage(err), "error");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Deseja realmente excluir a playlist "${playlist.name}"?`)) return;
    try {
      await excluirPlaylist({ variables: { id: playlist.id } });
      showToast("Playlist excluída.");
      navigate("/", { replace: true });
    } catch (err) {
      showToast(errorMessage(err), "error");
    }
  };

  const playAll = (shuffle = false) => {
    if (!songs.length) return;
    const list = shuffle ? [...songs].sort(() => Math.random() - 0.5) : songs;
    player.play(list[0], list);
  };

  return (
    <div className="page">
      <header className="playlist-hero">
        <Cover seed={playlist.name} size="xl" />
        <div className="playlist-info">
          <p className="eyebrow">
            Playlist · {VISIBILITY_LABELS[playlist.visibility] || "Privada"}
          </p>
          <h1>{playlist.name}</h1>
          {playlist.description && <p className="playlist-description">{playlist.description}</p>}
          <p className="playlist-meta">
            <strong>{playlist.owner?.name}</strong>
            {" · "}
            {countLabel(songs.length, "música", "músicas")} · {totalDuration(songs)}
          </p>
        </div>
      </header>

      <div className="playlist-controls">
        <button
          type="button"
          className="play-button large"
          onClick={() => playAll()}
          disabled={!songs.length}
          aria-label="Reproduzir playlist"
        >
          <PlayIcon size={22} />
        </button>
        <button
          type="button"
          className="icon-button bordered"
          onClick={() => playAll(true)}
          disabled={!songs.length}
          aria-label="Ordem aleatória"
          title="Ordem aleatória"
        >
          <ShuffleIcon size={18} />
        </button>

        {isOwner && (
          <>
            <button
              type="button"
              className="icon-button bordered"
              onClick={() => setEditing(true)}
              aria-label="Editar playlist"
              title="Editar playlist"
            >
              <EditIcon size={18} />
            </button>
            {playlist.visibility === "collaborative" && (
              <button
                type="button"
                className={`icon-button bordered ${showCollaborators ? "active" : ""}`}
                onClick={() => setShowCollaborators((value) => !value)}
                aria-label="Colaboradores"
                aria-expanded={showCollaborators}
                title="Colaboradores"
              >
                <UsersIcon size={18} />
              </button>
            )}
            <button
              type="button"
              className="icon-button bordered danger"
              onClick={handleDelete}
              aria-label="Excluir playlist"
              title="Excluir playlist"
            >
              <TrashIcon size={18} />
            </button>
          </>
        )}

        {!isOwner && isCollaborator && <span className="badge">Você é colaborador</span>}
      </div>

      {showCollaborators && isOwner && <Collaborators playlist={playlist} />}

      {songs.length > 0 ? (
        <TrackList songs={songs} onRemove={canManageSongs ? handleRemove : null} />
      ) : (
        <EmptyState icon={<SearchIcon size={28} />} title="Esta playlist está vazia">
          {canManageSongs ? (
            <p>
              Vá em <Link to="/buscar">Buscar</Link> e use o botão <strong>+</strong> para adicionar
              músicas.
            </p>
          ) : (
            <p>Ainda não há músicas aqui.</p>
          )}
        </EmptyState>
      )}

      {editing && <PlaylistForm playlist={playlist} onClose={() => setEditing(false)} />}
    </div>
  );
}

export default PlaylistDetail;
