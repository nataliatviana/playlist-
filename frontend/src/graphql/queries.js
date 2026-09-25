import { gql } from "@apollo/client";

export const SONG_FIELDS = gql`
  fragment SongFields on Song {
    id
    title
    duration
    artist {
      id
      name
    }
    album {
      id
      title
    }
    genre {
      id
      name
    }
  }
`;

export const GET_MINHAS_PLAYLISTS = gql`
  query GetMinhasPlaylists {
    minhasPlaylists {
      id
      name
      description
      visibility
      owner {
        id
        name
      }
      songs {
        id
        duration
      }
    }
  }
`;

export const GET_PLAYLIST = gql`
  ${SONG_FIELDS}
  query GetPlaylist($id: ID!) {
    playlist(id: $id) {
      id
      name
      description
      visibility
      owner {
        id
        name
      }
      collaborators {
        id
        name
        email
      }
      songs {
        ...SongFields
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_MUSICAS = gql`
  ${SONG_FIELDS}
  query GetMusicas {
    musicas {
      ...SongFields
    }
  }
`;

export const GET_FAVORITOS = gql`
  ${SONG_FIELDS}
  query GetFavoritos {
    favoritos {
      id
      createdAt
      song {
        ...SongFields
      }
    }
  }
`;

export const GET_AVALIACOES = gql`
  query GetAvaliacoes {
    avaliacoes {
      id
      score
      song {
        id
      }
    }
  }
`;
