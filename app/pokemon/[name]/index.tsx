import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import PokedexFrame from "../../../components/PokedexFrame";
import { fetchPokemonByName } from "../../services/pokemonServices";
import type { PokemonDetail } from "../../types/types";
import ErrorView from "./ErrorView";
import InfoRow from "./InfoRow";
import LoadingView from "./LoadingView";
import StatRow from "./StatRow";

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

  if (isLoading) return <PokedexFrame title={title}><LoadingView /></PokedexFrame>;

  if (isError || !pokemon)
    return (
      <PokedexFrame title={title}>
        <ErrorView error={error} onRetry={refetch} isRetrying={isFetching} onBack={goBack} />
      </PokedexFrame>
    );

  return (
    <PokedexFrame title={title}>
      <View className="flex-1">
        <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
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
              <Text className="text-[#111] text-center mb-[12px]">No sprite available</Text>
            )}

            {/* Basic Info */}
            <View className="mt-[10px] border-0 rounded-[10px] overflow-hidden">
              <InfoRow label="Height" value={pokemon.height} valueColor="#1e90ff" />
              <InfoRow label="Weight" value={pokemon.weight} valueColor="#df8920" isAlternate />
              <InfoRow
                label="Abilities"
                value={pokemon.abilities.map((a) => a.ability.name).join(", ")}
                valueColor="#5bd85b"
              />
              <InfoRow
                label="Types"
                value={pokemon.types.map((t) => t.type.name).join(", ")}
                valueColor="#ec3496"
                isAlternate
              />
            </View>

            {/* Stats */}
            <View className="mt-[10px] border-0 overflow-hidden">
              <Text className="font-black text-[#4e4c4c] px-[10px] py-[8px] bg-slate-200">Stats</Text>
              {pokemon.stats.map((s, index) => (
                <StatRow key={s.stat.name} name={s.stat.name} value={s.base_stat} isAlternate={index % 2 === 0} />
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Back Button */}
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
