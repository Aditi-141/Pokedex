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
      contentContainerClassName="p-[12px] pb-[18px]"
      onScrollToIndexFailed={() => {}}
      renderItem={({ item, index }) => (
        <PokemonCard
          name={item.name}
          selected={index === selectedIndex}
          onPress={() => onSelectAndOpen(index)}
        />
      )}
      ListEmptyComponent={
        <View className="p-[18px]">
          <Text className="text-[#222] font-bold">
            No matches for “{query}”
          </Text>
        </View>
      }
    />
  );
}
