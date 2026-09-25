import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { GET_PLAYLIST } from "../graphql/queries";
import { ADICIONAR_COLABORADOR, REMOVER_COLABORADOR } from "../graphql/mutations";
import { useToast } from "../context/ToastContext";
import { errorMessage } from "../utils/format";
import { CloseIcon } from "./Icons";

// Playlist colaborativa: o dono autoriza outros usuários pelo ID
// (a mutation adicionarColaborador do backend recebe userId).
function Collaborators({ playlist }) {
  const showToast = useToast();
  const [userId, setUserId] = useState("");
  const refetchQueries = [{ query: GET_PLAYLIST, variables: { id: playlist.id } }];
  const [adicionar, { loading }] = useMutation(ADICIONAR_COLABORADOR, { refetchQueries });
  const [remover] = useMutation(REMOVER_COLABORADOR, { refetchQueries });

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      await adicionar({ variables: { playlistId: playlist.id, userId: userId.trim() } });
      setUserId("");
      showToast("Colaborador adicionado.");
    } catch (err) {
      showToast(errorMessage(err), "error");
    }
  };

  const handleRemove = async (collaborator) => {
    try {
      await remover({ variables: { playlistId: playlist.id, userId: collaborator.id } });
      showToast(`${collaborator.name} não é mais colaborador.`);
    } catch (err) {
      showToast(errorMessage(err), "error");
    }
  };

  return (
    <section className="panel">
      <h2>Colaboradores</h2>
      <p className="muted">Eles podem adicionar e remover músicas desta playlist.</p>

      <ul className="chips">
        {playlist.collaborators.length === 0 && <li className="muted">Nenhum colaborador ainda.</li>}
        {playlist.collaborators.map((collaborator) => (
          <li key={collaborator.id} className="chip">
            {collaborator.name}
            <button
              type="button"
              onClick={() => handleRemove(collaborator)}
              aria-label={`Remover ${collaborator.name}`}
            >
              <CloseIcon size={14} />
            </button>
          </li>
        ))}
      </ul>

      <form className="inline-form" onSubmit={handleAdd}>
        <input
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          placeholder="Cole o ID do usuário"
          aria-label="ID do usuário"
          required
        />
        <button type="submit" className="button primary" disabled={loading}>
          Adicionar
        </button>
      </form>
    </section>
  );
}

export default Collaborators;
