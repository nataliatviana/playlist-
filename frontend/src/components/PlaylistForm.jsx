import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ATUALIZAR_PLAYLIST, CRIAR_PLAYLIST } from "../graphql/mutations";
import { GET_MINHAS_PLAYLISTS, GET_PLAYLIST } from "../graphql/queries";
import { errorMessage, VISIBILITY_LABELS } from "../utils/format";
import ErrorMessage from "./ErrorMessage";
import Modal from "./Modal";

const VISIBILITY_HINTS = {
  private: "Só você pode ver.",
  public: "Qualquer pessoa pode ver.",
  collaborative: "Colaboradores podem adicionar músicas.",
};

// Um único formulário para CREATE e UPDATE de playlist (como o PessoaForm do roteiro).
function PlaylistForm({ playlist, onClose, onSaved }) {
  const [name, setName] = useState(playlist?.name || "");
  const [description, setDescription] = useState(playlist?.description || "");
  const [visibility, setVisibility] = useState(playlist?.visibility || "private");
  const [error, setError] = useState("");

  const refetchQueries = [{ query: GET_MINHAS_PLAYLISTS }];
  if (playlist) refetchQueries.push({ query: GET_PLAYLIST, variables: { id: playlist.id } });

  const [criar, { loading: creating }] = useMutation(CRIAR_PLAYLIST, { refetchQueries });
  const [atualizar, { loading: updating }] = useMutation(ATUALIZAR_PLAYLIST, { refetchQueries });
  const saving = creating || updating;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const variables = { name: name.trim(), description: description.trim(), visibility };

    try {
      if (playlist) {
        await atualizar({ variables: { id: playlist.id, ...variables } });
        onSaved?.(playlist.id);
      } else {
        const { data } = await criar({ variables });
        onSaved?.(data.criarPlaylist.id);
      }
      onClose();
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <Modal title={playlist ? "Editar playlist" : "Nova playlist"} onClose={onClose}>
      <form className="form" onSubmit={handleSubmit}>
        <ErrorMessage message={error} />

        <div className="form-group">
          <label htmlFor="playlist-name">Nome</label>
          <input
            id="playlist-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex.: Late Night Driving"
            required
            autoFocus
            maxLength={80}
          />
        </div>

        <div className="form-group">
          <label htmlFor="playlist-description">Descrição</label>
          <textarea
            id="playlist-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Opcional"
            rows={3}
            maxLength={300}
          />
        </div>

        <fieldset className="form-group">
          <legend>Visibilidade</legend>
          <div className="segmented">
            {Object.entries(VISIBILITY_LABELS).map(([value, label]) => (
              <label key={value} className={visibility === value ? "selected" : ""}>
                <input
                  type="radio"
                  name="visibility"
                  value={value}
                  checked={visibility === value}
                  onChange={() => setVisibility(value)}
                />
                {label}
              </label>
            ))}
          </div>
          <small className="hint">{VISIBILITY_HINTS[visibility]}</small>
        </fieldset>

        <div className="form-buttons">
          <button type="button" className="button ghost" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="button primary" disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default PlaylistForm;
