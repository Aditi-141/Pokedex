import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import PokedexFrame from "../../../components/PokedexFrame";
import { fetchPokemonByName } from "../../services/pokemonServices";
import type { PokemonDetail } from "../../types";

export default function PokemonDetailScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();

  const title = useMemo(() => "POKEDEX", []);

  const pokemonName = typeof name === "string" ? name : "";

  const { data: pokemon, isLoading, isError, error, refetch, isFetching } =
    useQuery<PokemonDetail>({
      queryKey: ["pokemon-detail", pokemonName.toLowerCase()],
      queryFn: () => fetchPokemonByName(pokemonName),
      enabled: !!pokemonName,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });

  const spriteUri =
    pokemon?.sprites?.front_default?.replace("http://", "https://") ?? "";

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  if (isLoading) {
    return (
      <PokedexFrame title={title}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      </PokedexFrame>
    );
  }

  if (isError || !pokemon) {
    return (
      <PokedexFrame title={title}>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="font-black text-[#333] text-center mb-3">
            Couldn’t load Pokémon details
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

          <Pressable onPress={goBack} className="mt-3">
            <Text className="font-bold text-[#1e90ff]">Back</Text>
          </Pressable>
        </View>
      </PokedexFrame>
    );
  }

  return (
    <PokedexFrame title={title}>
      <View className="flex-1">
        <ScrollView
          contentContainerStyle={{ padding: 14, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-white border-[3px] border-[#e7e5e5] rounded-[14px] p-[14px]">
            <Text className="text-[22px] font-black text-[#4b4a4a] capitalize mb-[12px]">
              {pokemon.id} • {pokemon.name}
            </Text>

            {spriteUri ? (
              <Image
                source={{ uri: spriteUri }}
                style={{ width: 200, height: 200, alignSelf: "center" }}
                resizeMode="contain"
              />
            ) : (
              <Text className="text-[#111] text-center mb-[12px]">
                No sprite available
              </Text>
            )}

            <View className="mt-[10px] border-0 rounded-[10px] overflow-hidden">
              <View className="flex-row justify-between py-[10px] bg-slate-200 border-t border-[#ddd] mt-[12px]">
                <Text className="font-black text-[#4e4c4c] pl-[10px]">
                  Height
                </Text>
                <Text className="font-extrabold text-[#1e90ff] pr-[10px]">
                  {pokemon.height}
                </Text>
              </View>

              <View className="flex-row justify-between py-[10px] bg-slate-100 border-t border-[#ddd]">
                <Text className="font-black text-[#4e4c4c] pl-[10px]">
                  Weight
                </Text>
                <Text className="font-extrabold text-[#df8920] pr-[10px]">
                  {pokemon.weight}
                </Text>
              </View>

              <View className="flex-row justify-between py-[10px] bg-slate-200 border-t border-[#ddd]">
                <Text className="font-black text-[#4e4c4c] pl-[10px]">
                  Abilities
                </Text>
                <Text className="font-extrabold text-[#5bd85b] pr-[10px] capitalize">
                  {pokemon.abilities.map((a) => a.ability.name).join(", ")}
                </Text>
              </View>

              <View className="flex-row justify-between py-[10px] bg-slate-100 border-t border-[#ddd]">
                <Text className="font-black text-[#4e4c4c] pl-[10px]">
                  Types
                </Text>
                <Text className="font-extrabold text-[#ec3496] pr-[10px] capitalize">
                  {pokemon.types.map((t) => t.type.name).join(", ")}
                </Text>
              </View>
            </View>

            <View className="mt-[10px] border-0 overflow-hidden">
              <Text className="font-black text-[#4e4c4c] px-[10px] py-[8px] bg-slate-200">
                Stats
              </Text>

              {pokemon.stats.map((s, index) => (
                <View
                  key={s.stat.name}
                  className={`flex-row justify-between py-[8px] px-[10px] ${
                    index % 2 === 0 ? "bg-slate-100" : "bg-slate-200"
                  }`}
                >
                  <Text className="font-bold text-[#4e4c4c] capitalize">
                    {s.stat.name.replace("-", " ")}
                  </Text>
                  <Text className="font-extrabold text-[#1e90ff]">
                    {s.base_stat}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 p-[14px] bg-[#f3f3f3] border-t border-[#ddd]">
          <Pressable
          testID="btn-back"
          accessibilityLabel="btn-back"
          accessibilityRole="button"
          accessible
            onPress={goBack}
            className="w-full h-[56px] rounded-[10px] bg-[#f38b8b] items-center justify-center"
          >
            <Text className="font-black text-[#333]">Back</Text>
          </Pressable>
        </View>
      </View>
    </PokedexFrame>
  );
}
