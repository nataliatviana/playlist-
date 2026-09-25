import { useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_AVALIACOES } from "../graphql/queries";
import { AVALIAR_MUSICA, REMOVER_AVALIACAO } from "../graphql/mutations";

export function useRatings() {
  const { data } = useQuery(GET_AVALIACOES);
  const refetchQueries = [{ query: GET_AVALIACOES }];
  const [avaliar] = useMutation(AVALIAR_MUSICA, { refetchQueries });
  const [remover] = useMutation(REMOVER_AVALIACAO, { refetchQueries });

  const scores = useMemo(() => {
    const map = new Map();
    for (const rating of data?.avaliacoes || []) {
      if (rating.song) map.set(rating.song.id, rating.score);
    }
    return map;
  }, [data]);

  // Clicar na mesma nota já dada remove a avaliação.
  const rate = async (songId, score) => {
    if (scores.get(songId) === score) {
      await remover({ variables: { musicaId: songId } });
    } else {
      await avaliar({ variables: { musicaId: songId, score } });
    }
  };

  return { scoreOf: (songId) => scores.get(songId) || 0, rate };
}
