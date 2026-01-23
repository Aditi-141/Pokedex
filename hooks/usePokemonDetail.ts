import { useQuery } from "@tanstack/react-query";
import { fetchPokemonByName } from "../app/services/pokemonServices";
import type { PokemonDetail } from "../app/types/types";

/**
 * Custom hook to fetch Pokémon details by name
 */
export const usePokemonDetail = (pokemonName?: string) => {
  return useQuery<PokemonDetail>({
    queryKey: ["pokemon-detail", pokemonName?.toLowerCase()],
    queryFn: () => fetchPokemonByName(pokemonName!),
    enabled: !!pokemonName,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};
