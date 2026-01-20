import { LegendList } from "@legendapp/list";
import React from "react";
import { Text, View } from "react-native";
import PokemonCard from "./PokemonCard";

export type PokemonListItem = { name: string; url: string };

export type LegendListRef = {
  scrollToIndex: (params: { index: number; animated?: boolean; viewPosition?: number }) => void;
} | null;

export default function PokemonList({
  data,
  selectedIndex,
  listRef,
  onSelectAndOpen,
  query,
}: {
  data: PokemonListItem[];
  selectedIndex: number;
  listRef: React.RefObject<LegendListRef>;
  onSelectAndOpen: (index: number) => void;
  query: string;
}) {
  return (
    <LegendList
      ref={listRef as any}
      data={data}
      keyExtractor={(item) => item.name}
      contentContainerStyle={{ padding: 12, paddingBottom: 18 }}
      renderItem={({ item, index }: { item: PokemonListItem; index: number }) => (
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
