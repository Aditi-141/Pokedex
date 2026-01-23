import Constants from "expo-constants";
import type { PokemonListItem } from "../../components/PokemonList";
import type { PokemonDetail } from "../types/types";

let API_BASE = Constants.expoConfig?.extra?.API_BASE as string | undefined;

if (!API_BASE) {
  throw new Error("API_BASE is missing. Set it in app.config.js -> extra.API_BASE");
}
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
