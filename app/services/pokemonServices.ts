import type { PokemonListItem } from "../../components/PokemonList";
import type { PokemonDetail } from "../pokemon/[name]/PokemonDetail";


const API_BASE = "https://pokeapi.co/api/v2";

export async function fetchPokemonByName(name: string): Promise<PokemonDetail> {
  const safeName = name.trim().toLowerCase();

  const res = await fetch(`${API_BASE}/pokemon/${safeName}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch pokemon "${safeName}" (${res.status})`);
  }

  return res.json();
}


type PokemonListResponse = {
  results: PokemonListItem[];
};

export async function fetchPokemonList(limit = 151): Promise<PokemonListItem[]> {
  const res = await fetch(`${API_BASE}/pokemon?limit=${limit}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch pokemon list (${res.status})`);
  }

  const data = (await res.json()) as PokemonListResponse;
  return data.results ?? [];
}
