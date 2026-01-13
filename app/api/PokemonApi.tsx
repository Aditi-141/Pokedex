const BASE_URL = "https://pokeapi.co/api/v2";

export type PokemonListItem = {
  name: string;
  url: string;
};

export async function fetchPokemon(
  limit = 20
): Promise<PokemonListItem[]> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  const data = await response.json();
  return data.results;
}

export async function fetchPokemonDetail(name: string) {
  const response = await fetch(`${BASE_URL}/pokemon/${name}`);
  return response.json();
}
