import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

import { PokedexControlsProvider } from "../components/PokedexControlsContext";
import PokedexFooter from "../components/PokedexFooter";
import PokedexFrame from "../components/PokedexFrame";
import type { LegendListRef, PokemonListItem } from "../components/PokemonList";
import PokemonList from "../components/PokemonList";
import { fetchPokemonList } from "./services/pokemonServices";

export default function PokedexScreen() {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const router = useRouter();

  const listRef = useRef<LegendListRef>(null);
  const searchRef = useRef<TextInput | null>(null);

  const {
    data: pokemon = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<PokemonListItem[]>({
    queryKey: ["pokemon-list", 151],
    queryFn: () => fetchPokemonList(151),
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pokemon;
    return pokemon.filter((p) => p.name.includes(q));
  }, [pokemon, query]);

  const safeIndex = useMemo(() => {
    if (filtered.length === 0) return 0;
    return Math.min(selectedIndex, filtered.length - 1);
  }, [selectedIndex, filtered.length]);

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
    const next = Math.max(0, Math.min(filtered.length - 1, safeIndex + delta));
    setSelectedIndex(next);
    scrollTo(next);
  };

  const openSelected = () => {
    if (!filtered.length) return;
    router.push(`/pokemon/${filtered[safeIndex].name}`);
  };

  const clearOrTop = () => {
    if (query.trim()) setQuery("");
    setSelectedIndex(0);
    scrollTo(0);
  };

  return (
    <PokedexControlsProvider
      value={{
        query,
        setQuery,
        searchRef,
        onUp: () => move(-1),
        onDown: () => move(1),
        onLeft: () => move(-5),
        onRight: () => move(5),
        onCenter: () => searchRef.current?.focus(),
        onAccept: openSelected,
        onReject: clearOrTop,
      }}
    >
      <PokedexFrame title="POKEDEX" footer={<PokedexFooter />}>
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#e31919" />
            <Text className="mt-[10px] text-[16px] text-[#e31919] font-bold">
              Loading Pokemon…
            </Text>
          </View>
        ) : isError ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="font-black text-[#333] text-center mb-3">
              Couldn't load Pokémon list
            </Text>
            <Text className="text-[#666] text-center mb-4">
              {error instanceof Error ? error.message : "Unknown error"}
            </Text>

            <Pressable
              onPress={() => refetch()}
              className="w-full h-[56px] rounded-[10px] bg-[#f38b8b] items-center justify-center"
            >
              <Text className="font-black text-[#333]">
                {isFetching ? "Retrying..." : "Retry"}
              </Text>
            </Pressable>
          </View>
        ) : (
          <PokemonList
            data={filtered}
            selectedIndex={safeIndex}
            listRef={listRef}
            query={query}
            onSelectAndOpen={(i) => {
              setSelectedIndex(i);
              router.push(`/pokemon/${filtered[i].name}`);
            }}
          />
        )}
      </PokedexFrame>
    </PokedexControlsProvider>
  );
}
