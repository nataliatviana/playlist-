const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Genre {
    id: ID!
    name: String
  }

  type Artist {
    id: ID!
    name: String!
    bio: String
  }

  type Album {
    id: ID!
    title: String!
    releaseYear: Int
    artist: Artist
  }

  type Song {
    id: ID!
    title: String!
    duration: Int!
    artist: Artist
    album: Album
    genre: Genre
  }

  type Playlist {
    id: ID!
    name: String!
    description: String
    visibility: String
    owner: User
    songs: [Song]
    collaborators: [User]
    createdAt: String
    updatedAt: String
  }

  type Favorite {
    id: ID!
    user: User!
    song: Song!
    createdAt: String
  }

  type Rating {
    id: ID!
    user: User!
    song: Song!
    score: Int!
    createdAt: String
    updatedAt: String
  }

  type Query {
    musicas: [Song]
    artistas: [Artist]
    albuns: [Album]
    playlists: [Playlist]
    playlist(id: ID!): Playlist
    minhasPlaylists: [Playlist]
    favoritos: [Favorite]
    avaliacoes: [Rating]
  }

  type Mutation {
    criarMusica(
      title: String!
      duration: Int!
      artist: ID!
      album: ID
      genre: ID!
    ): Song

    criarPlaylist(
      name: String!
      description: String
      visibility: String
    ): Playlist

    atualizarPlaylist(
      id: ID!
      name: String
      description: String
      visibility: String
    ): Playlist

    excluirPlaylist(id: ID!): Boolean!

    adicionarMusicaPlaylist(playlistId: ID!, musicaId: ID!): Playlist
    removerMusicaPlaylist(playlistId: ID!, musicaId: ID!): Playlist

    adicionarColaborador(playlistId: ID!, userId: ID!): Playlist
    removerColaborador(playlistId: ID!, userId: ID!): Playlist

    favoritarMusica(musicaId: ID!): Favorite
    desfavoritarMusica(musicaId: ID!): Boolean!

    avaliarMusica(musicaId: ID!, score: Int!): Rating
    removerAvaliacao(musicaId: ID!): Boolean!
  }
`;

module.exports = typeDefs;
