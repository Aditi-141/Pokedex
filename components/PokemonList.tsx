import React from "react";
import { FlatList, Text, View } from "react-native";
import PokemonCard from "./PokemonCard";

export type PokemonListItem = { name: string; url: string };

export default function PokemonList({
  data,
  selectedIndex,
  listRef,
  onSelectAndOpen,
  query,
}: {
  data: PokemonListItem[];
  selectedIndex: number;

  listRef: React.RefObject<FlatList<PokemonListItem> | null>;

  onSelectAndOpen: (index: number) => void;
  query: string;
}) {
  return (
    <FlatList
      ref={listRef}
      data={data}
      keyExtractor={(item) => item.name}
      contentContainerStyle={{ padding: 12, paddingBottom: 18 }}
      onScrollToIndexFailed={() => {}}
      renderItem={({ item, index }) => (
        <PokemonCard
          name={item.name}
          selected={index === selectedIndex}
          onPress={() => onSelectAndOpen(index)}
        />
      )}
      ListEmptyComponent={
        <View style={{ padding: 18 }}>
          <Text style={{ color: "#222", fontWeight: "700" }}>
            No matches for “{query}”
          </Text>
        </View>
      }
    />
  );
}
