import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_MINHAS_PLAYLISTS, GET_PLAYLIST } from "../graphql/queries";
import { ADICIONAR_MUSICA_PLAYLIST } from "../graphql/mutations";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { errorMessage } from "../utils/format";
import { PlusIcon } from "./Icons";

function AddToPlaylist({ song }) {
  const { user } = useAuth();
  const showToast = useToast();
  const [open, setOpen] = useState(false);
  const wrapper = useRef(null);
  const { data } = useQuery(GET_MINHAS_PLAYLISTS);
  const [adicionar] = useMutation(ADICIONAR_MUSICA_PLAYLIST);

  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (!wrapper.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  // Só aparecem playlists em que o usuário pode mexer nas músicas:
  // as próprias e as colaborativas em que ele é colaborador.
  const editable = (data?.minhasPlaylists || []).filter(
    (playlist) => playlist.owner?.id === user?.id || playlist.visibility === "collaborative"
  );

  const handleAdd = async (playlist) => {
    setOpen(false);
    if (playlist.songs?.some((item) => item.id === song.id)) {
      showToast(`"${song.title}" já está em ${playlist.name}.`, "info");
      return;
    }
    try {
      await adicionar({
        variables: { playlistId: playlist.id, musicaId: song.id },
        refetchQueries: [
          { query: GET_MINHAS_PLAYLISTS },
          { query: GET_PLAYLIST, variables: { id: playlist.id } },
        ],
      });
      showToast(`Adicionada a ${playlist.name}.`);
    } catch (error) {
      showToast(errorMessage(error), "error");
    }
  };

  return (
    <div className="popover-wrapper" ref={wrapper} onClick={(event) => event.stopPropagation()}>
      <button
        type="button"
        className="icon-button"
        onClick={() => setOpen((value) => !value)}
        aria-label={`Adicionar ${song.title} a uma playlist`}
        aria-expanded={open}
        title="Adicionar à playlist"
      >
        <PlusIcon size={18} />
      </button>
      {open && (
        <div className="popover" role="menu">
          <p className="popover-title">Adicionar à playlist</p>
          {editable.length === 0 && <p className="popover-empty">Crie uma playlist primeiro.</p>}
          {editable.map((playlist) => (
            <button
              key={playlist.id}
              type="button"
              role="menuitem"
              className="popover-item"
              onClick={() => handleAdd(playlist)}
            >
              {playlist.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddToPlaylist;
