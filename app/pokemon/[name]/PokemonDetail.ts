export interface PokemonDetail {
  abilities: { ability: { name: string } }[];
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
  types: { type: { name: string } }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
};