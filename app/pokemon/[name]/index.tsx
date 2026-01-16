import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";

import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import PokedexFrame from "../../../components/PokedexFrame";

type PokemonDetail = {
  abilities: { ability: { name: string } }[];
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
  types: { type: { name: string } }[];
};

export default function PokemonDetailScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();

  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const title = useMemo(() => "POKEDEX", []);

  useEffect(() => {
    if (!name) return;

    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${String(name).toLowerCase()}`)
      .then((res) => res.json())
      .then((data: PokemonDetail) => setPokemon(data))
      .catch((e) => console.log("Fetch error:", e))
      .finally(() => setLoading(false));
  }, [name]);

  const spriteUri =
    pokemon?.sprites?.front_default?.replace("http://", "https://") ?? "";

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  return (
    <PokedexFrame title={title}>
      {loading || !pokemon ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#e31919" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 14 }}>
          <View className="bg-white border-[3px] border-[#e7e5e5] rounded-[14px] p-[14px]">
            <Text className="text-[22px] font-black text-[#4b4a4a] capitalize mb-[12px]">
              {pokemon.id} • {pokemon.name}
            </Text>

            {spriteUri ? (
              <Image
                source={{ uri: spriteUri }}
                style={{ width: 220, height: 220, alignSelf: "center" }}
                resizeMode="contain"
                onLoad={() => console.log("Image loaded")}
                onError={(e) =>
                  console.log("Image error:", e.nativeEvent, "URI:", spriteUri)
                }
              />
            ) : (
              <Text className="text-[#111] text-center mb-[12px]">
                No sprite available for this Pokémon
              </Text>
            )}

            <View className="flex-row justify-between py-[10px]  bg-slate-200  border-t border-t-[#ddd] mt-[12px]">
              <Text className="font-black text-[#4e4c4c]  pl-[10px]">Height</Text>
              <Text className="font-extrabold text-[#1e90ff] capitalize pr-[10px]">
                {pokemon.height}
              </Text>
            </View>

            <View className="flex-row justify-between py-[10px] bg-slate-100 border-t border-t-[#ddd]">
              <Text className="font-black text-[#4e4c4c] pl-[10px]">Weight</Text>
              <Text className="font-extrabold text-[#df8920] capitalize pr-[10px]">
                {pokemon.weight}
              </Text>
            </View>

            <View className="flex-row justify-between py-[10px] bg-slate-200  border-t border-t-[#ddd]">
              <Text className="font-black text-[#4e4c4c]  pl-[10px]">Abilities</Text>
              <Text className="font-extrabold text-[#5bd85b] capitalize pr-[10px]">
                {pokemon.abilities
                  ?.map((a) => a.ability.name)
                  .join(", ") ?? "—"}
              </Text>
            </View>

            {/* Types */}
            <View className="flex-row justify-between py-[10px] border-t  bg-slate-100 border-t-[#ddd]">
              <Text className="font-black text-[#4e4c4c] pl-[10px]">Types</Text>
              <Text className="font-extrabold text-[#ec3496] capitalize pr-[10px]">
                {pokemon.types.map((t) => t.type.name).join(", ")}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={goBack}
            className="w-full h-[56px] rounded-[10px] bg-[#f38b8b] border-[3px] border-[#e71e1e] items-center justify-center mt-[12px]"
          >
            <Text className="font-black text-[#333]">Back</Text>
          </Pressable>
        </ScrollView>
      )}
    </PokedexFrame>
  );
}
