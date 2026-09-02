const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Genre = require("../models/Genre");
const Favorite = require("../models/Favorite");
const Rating = require("../models/Rating");

const requireAuthenticatedUser = (context) => {
  if (!context.userId) {
    throw new Error("Autenticação necessária");
  }

  return context.userId;
};

const isSameUser = (firstId, secondId) =>
  firstId && secondId && firstId.toString() === secondId.toString();

const isOwner = (playlist, userId) => isSameUser(playlist.owner, userId);

const canManageSongs = (playlist, userId) =>
  isOwner(playlist, userId) ||
  (playlist.visibility === "collaborative" &&
    playlist.collaborators.some((collaboratorId) =>
      isSameUser(collaboratorId, userId)
    ));

const resolvers = {
  Query: {
    musicas: async () => await Song.find(),
    artistas: async () => await Artist.find(),
    albuns: async () => await Album.find(),
    playlists: async () => await Playlist.find(),
    playlist: async (_, { id }) => {
      const playlist = await Playlist.findById(id);

      if (!playlist) {
        throw new Error("Playlist não encontrada");
      }

      return playlist;
    },
    minhasPlaylists: async (_, __, context) => {
      const userId = requireAuthenticatedUser(context);
      return await Playlist.find({
        $or: [{ owner: userId }, { collaborators: userId }],
      });
    },
    favoritos: async (_, __, context) => {
      const userId = requireAuthenticatedUser(context);
      return await Favorite.find({ user: userId }).sort({ createdAt: -1 });
    },
    avaliacoes: async (_, __, context) => {
      const userId = requireAuthenticatedUser(context);
      return await Rating.find({ user: userId }).sort({ updatedAt: -1 });
    },
  },

  Mutation: {
    criarMusica: async (_, { title, duration, artist, album, genre }, context) => {
      requireAuthenticatedUser(context);
      const song = new Song({ title, duration, artist, album, genre });
      return await song.save();
    },

    criarPlaylist: async (_, { name, description, visibility }, context) => {
      const owner = requireAuthenticatedUser(context);
      const playlist = new Playlist({ name, description, visibility, owner });
      return await playlist.save();
    },

    atualizarPlaylist: async (_, { id, name, description, visibility }, context) => {
      const userId = requireAuthenticatedUser(context);
      const playlist = await Playlist.findById(id);

      if (!playlist) {
        throw new Error("Playlist não encontrada");
      }
      if (!isOwner(playlist, userId)) {
        throw new Error("Apenas o dono pode editar a playlist");
      }

      if (name !== undefined) playlist.name = name;
      if (description !== undefined) playlist.description = description;
      if (visibility !== undefined) playlist.visibility = visibility;

      return await playlist.save();
    },

    excluirPlaylist: async (_, { id }, context) => {
      const userId = requireAuthenticatedUser(context);
      const playlist = await Playlist.findById(id);

      if (!playlist) {
        throw new Error("Playlist não encontrada");
      }
      if (!isOwner(playlist, userId)) {
        throw new Error("Apenas o dono pode excluir a playlist");
      }

      await playlist.deleteOne();

      return true;
    },

    adicionarMusicaPlaylist: async (_, { playlistId, musicaId }, context) => {
      const userId = requireAuthenticatedUser(context);
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        throw new Error("Playlist não encontrada");
      }
      if (!canManageSongs(playlist, userId)) {
        throw new Error("Você não tem permissão para alterar as músicas desta playlist");
      }

      const songExists = await Song.findById(musicaId);
      if (!songExists) {
        throw new Error("Música não encontrada");
      }

      const jaExiste = playlist.songs.some(
        (id) => id.toString() === musicaId
      );
      if (!jaExiste) {
        playlist.songs.push(musicaId);
        await playlist.save();
      }

      return playlist;
    },

    removerMusicaPlaylist: async (_, { playlistId, musicaId }, context) => {
      const userId = requireAuthenticatedUser(context);
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        throw new Error("Playlist não encontrada");
      }
      if (!canManageSongs(playlist, userId)) {
        throw new Error("Você não tem permissão para alterar as músicas desta playlist");
      }

      const musicaEstaNaPlaylist = playlist.songs.some(
        (id) => id.toString() === musicaId
      );
      if (!musicaEstaNaPlaylist) {
        throw new Error("Música não está nesta playlist");
      }

      playlist.songs = playlist.songs.filter(
        (id) => id.toString() !== musicaId
      );
      return await playlist.save();
    },

    adicionarColaborador: async (_, { playlistId, userId }, context) => {
      const authenticatedUserId = requireAuthenticatedUser(context);
      const playlist = await Playlist.findById(playlistId);

      if (!playlist) {
        throw new Error("Playlist não encontrada");
      }
      if (!isOwner(playlist, authenticatedUserId)) {
        throw new Error("Apenas o dono pode adicionar colaboradores");
      }
      if (playlist.visibility !== "collaborative") {
        throw new Error("A playlist precisa ter visibilidade collaborative");
      }
      if (isOwner(playlist, userId)) {
        throw new Error("O dono já possui acesso à playlist");
      }

      const user = await User.findById(userId);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const isCollaborator = playlist.collaborators.some((collaboratorId) =>
        isSameUser(collaboratorId, userId)
      );
      if (!isCollaborator) {
        playlist.collaborators.push(userId);
        await playlist.save();
      }

      return playlist;
    },

    removerColaborador: async (_, { playlistId, userId }, context) => {
      const authenticatedUserId = requireAuthenticatedUser(context);
      const playlist = await Playlist.findById(playlistId);

      if (!playlist) {
        throw new Error("Playlist não encontrada");
      }
      if (!isOwner(playlist, authenticatedUserId)) {
        throw new Error("Apenas o dono pode remover colaboradores");
      }

      const isCollaborator = playlist.collaborators.some((collaboratorId) =>
        isSameUser(collaboratorId, userId)
      );
      if (!isCollaborator) {
        throw new Error("Usuário não é colaborador desta playlist");
      }

      playlist.collaborators = playlist.collaborators.filter(
        (collaboratorId) => !isSameUser(collaboratorId, userId)
      );
      return await playlist.save();
    },

    favoritarMusica: async (_, { musicaId }, context) => {
      const userId = requireAuthenticatedUser(context);
      const song = await Song.findById(musicaId);

      if (!song) {
        throw new Error("Música não encontrada");
      }

      return await Favorite.findOneAndUpdate(
        { user: userId, song: musicaId },
        { $setOnInsert: { user: userId, song: musicaId } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
    },

    desfavoritarMusica: async (_, { musicaId }, context) => {
      const userId = requireAuthenticatedUser(context);
      const favorite = await Favorite.findOneAndDelete({
        user: userId,
        song: musicaId,
      });

      if (!favorite) {
        throw new Error("Música não está nos seus favoritos");
      }

      return true;
    },

    avaliarMusica: async (_, { musicaId, score }, context) => {
      const userId = requireAuthenticatedUser(context);

      if (score < 1 || score > 5) {
        throw new Error("A avaliação deve ser um número entre 1 e 5");
      }

      const song = await Song.findById(musicaId);
      if (!song) {
        throw new Error("Música não encontrada");
      }

      return await Rating.findOneAndUpdate(
        { user: userId, song: musicaId },
        { score },
        { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
      );
    },

    removerAvaliacao: async (_, { musicaId }, context) => {
      const userId = requireAuthenticatedUser(context);
      const rating = await Rating.findOneAndDelete({
        user: userId,
        song: musicaId,
      });

      if (!rating) {
        throw new Error("Você ainda não avaliou esta música");
      }

      return true;
    },
  },

  // Resolvers de campo: resolvem as refs (ObjectId) para o objeto populado
  Playlist: {
    owner: async (playlist) => await User.findById(playlist.owner),
    songs: async (playlist) => await Song.find({ _id: { $in: playlist.songs } }),
    collaborators: async (playlist) =>
      await User.find({ _id: { $in: playlist.collaborators } }),
  },

  Song: {
    artist: async (song) => await Artist.findById(song.artist),
    album: async (song) => (song.album ? await Album.findById(song.album) : null),
    genre: async (song) => await Genre.findById(song.genre),
  },

  Album: {
    artist: async (album) => await Artist.findById(album.artist),
  },

  Favorite: {
    user: async (favorite) => await User.findById(favorite.user),
    song: async (favorite) => await Song.findById(favorite.song),
  },

  Rating: {
    user: async (rating) => await User.findById(rating.user),
    song: async (rating) => await Song.findById(rating.song),
  },
};

module.exports = resolvers;
