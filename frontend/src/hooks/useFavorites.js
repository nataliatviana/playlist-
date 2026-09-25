import { useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_FAVORITOS } from "../graphql/queries";
import { DESFAVORITAR_MUSICA, FAVORITAR_MUSICA } from "../graphql/mutations";

export function useFavorites() {
  const { data, loading, error } = useQuery(GET_FAVORITOS);
  const refetchQueries = [{ query: GET_FAVORITOS }];
  const [favoritar] = useMutation(FAVORITAR_MUSICA, { refetchQueries });
  const [desfavoritar] = useMutation(DESFAVORITAR_MUSICA, { refetchQueries });

  const favorites = useMemo(
    () => (data?.favoritos || []).filter((favorite) => favorite.song),
    [data]
  );
  const favoriteIds = useMemo(
    () => new Set(favorites.map((favorite) => favorite.song.id)),
    [favorites]
  );

  const toggleFavorite = async (songId) => {
    const variables = { musicaId: songId };
    if (favoriteIds.has(songId)) {
      await desfavoritar({ variables });
    } else {
      await favoritar({ variables });
    }
  };

  return {
    favorites,
    loading,
    error,
    isFavorite: (songId) => favoriteIds.has(songId),
    toggleFavorite,
  };
}
