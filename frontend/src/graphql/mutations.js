import { gql } from "@apollo/client";

export const CRIAR_PLAYLIST = gql`
  mutation CriarPlaylist($name: String!, $description: String, $visibility: String) {
    criarPlaylist(name: $name, description: $description, visibility: $visibility) {
      id
      name
      description
      visibility
    }
  }
`;

export const ATUALIZAR_PLAYLIST = gql`
  mutation AtualizarPlaylist(
    $id: ID!
    $name: String
    $description: String
    $visibility: String
  ) {
    atualizarPlaylist(
      id: $id
      name: $name
      description: $description
      visibility: $visibility
    ) {
      id
      name
      description
      visibility
    }
  }
`;

export const EXCLUIR_PLAYLIST = gql`
  mutation ExcluirPlaylist($id: ID!) {
    excluirPlaylist(id: $id)
  }
`;

export const ADICIONAR_MUSICA_PLAYLIST = gql`
  mutation AdicionarMusicaPlaylist($playlistId: ID!, $musicaId: ID!) {
    adicionarMusicaPlaylist(playlistId: $playlistId, musicaId: $musicaId) {
      id
    }
  }
`;

export const REMOVER_MUSICA_PLAYLIST = gql`
  mutation RemoverMusicaPlaylist($playlistId: ID!, $musicaId: ID!) {
    removerMusicaPlaylist(playlistId: $playlistId, musicaId: $musicaId) {
      id
    }
  }
`;

export const ADICIONAR_COLABORADOR = gql`
  mutation AdicionarColaborador($playlistId: ID!, $userId: ID!) {
    adicionarColaborador(playlistId: $playlistId, userId: $userId) {
      id
    }
  }
`;

export const REMOVER_COLABORADOR = gql`
  mutation RemoverColaborador($playlistId: ID!, $userId: ID!) {
    removerColaborador(playlistId: $playlistId, userId: $userId) {
      id
    }
  }
`;

export const FAVORITAR_MUSICA = gql`
  mutation FavoritarMusica($musicaId: ID!) {
    favoritarMusica(musicaId: $musicaId) {
      id
    }
  }
`;

export const DESFAVORITAR_MUSICA = gql`
  mutation DesfavoritarMusica($musicaId: ID!) {
    desfavoritarMusica(musicaId: $musicaId)
  }
`;

export const AVALIAR_MUSICA = gql`
  mutation AvaliarMusica($musicaId: ID!, $score: Int!) {
    avaliarMusica(musicaId: $musicaId, score: $score) {
      id
      score
    }
  }
`;

export const REMOVER_AVALIACAO = gql`
  mutation RemoverAvaliacao($musicaId: ID!) {
    removerAvaliacao(musicaId: $musicaId)
  }
`;
