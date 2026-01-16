import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import PokedexFooter from "../components/PokedexFooter";
import PokedexFrame from "../components/PokedexFrame";
import PokemonList, { PokemonListItem } from "../components/PokemonList";

export default function PokedexScreen() {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const router = useRouter();

  const listRef = useRef<FlatList<PokemonListItem> | null>(null);
  const searchRef = useRef<TextInput | null>(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => setPokemon(data.results))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pokemon;
    return pokemon.filter((p) => p.name.includes(q));
  }, [pokemon, query]);

  useEffect(() => {
    if (filtered.length === 0) {
      setSelectedIndex(0);
      return;
    }
    setSelectedIndex((prev) => Math.min(prev, filtered.length - 1));
  }, [filtered.length]);

  const scrollTo = (index: number) => {
    if (!filtered.length) return;
    listRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const move = (delta: number) => {
    if (!filtered.length) return;
    const next = Math.max(
      0,
      Math.min(filtered.length - 1, selectedIndex + delta)
    );
    setSelectedIndex(next);
    scrollTo(next);
  };

  const openSelected = () => {
    if (!filtered.length) return;
    router.push(`/pokemon/${filtered[selectedIndex].name}`);
  };

  const clearOrTop = () => {
    if (query.trim()) setQuery("");
    setSelectedIndex(0);
    scrollTo(0);
  };

  return (
    <PokedexFrame
      title="POKEDEX"
      footer={
        <PokedexFooter
          query={query}
          setQuery={setQuery}
          searchRef={searchRef}
          onUp={() => move(-1)}
          onDown={() => move(1)}
          onLeft={() => move(-5)}
          onRight={() => move(5)}
          onCenter={() => searchRef.current?.focus()}
          onAccept={openSelected}
          onReject={clearOrTop}
        />
      }
    >
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#e31919" />
          <Text className="mt-[10px] text-[16px] text-[#e31919] font-bold">
            Loading Pokémon…
          </Text>
        </View>
      ) : (
        <PokemonList
          data={filtered}
          selectedIndex={selectedIndex}
          listRef={listRef}
          query={query}
          onSelectAndOpen={(i) => {
            setSelectedIndex(i);
            router.push(`/pokemon/${filtered[i].name}`);
          }}
        />
      )}
    </PokedexFrame>
  );
}
