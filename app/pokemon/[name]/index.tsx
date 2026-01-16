import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import PokedexFrame from "../../../components/PokedexFrame";

type PokemonDetail = {
  abilities: [];
  ability: [];
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
  types: { type: { name: string } }[];
};

export default function PokemonDetailScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();

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

  useEffect(() => {
    if (spriteUri) console.log("Sprite URI:", spriteUri);
  }, [spriteUri]);

  return (
    <PokedexFrame title={title}>
      {loading || !pokemon ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#e31919" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 14 }}>
          <View className="bg-white border-[3px] border-[#0c0c0c] rounded-[14px] p-[14px]">
            <Text className="text-[22px] font-black text-[#111] capitalize mb-[12px]">
              #{pokemon.id} • {pokemon.name}
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

            <View className="flex-row justify-between py-[10px] border-t border-t-[#ddd] mt-[12px]">
              <Text className="font-black text-[#333]">Height</Text>
              <Text className="font-extrabold text-[#111] capitalize">
                {pokemon.height}
              </Text>
            </View>

            <View className="flex-row justify-between py-[10px] border-t border-t-[#ddd]">
              <Text className="font-black text-[#333]">Weight</Text>
              <Text className="font-extrabold text-[#111] capitalize">
                {pokemon.weight}
              </Text>
            </View>

            <View className="flex-row justify-between py-[10px] border-t border-t-[#ddd]">
              <Text className="font-black text-[#333]">Abilities</Text>
              <Text className="font-extrabold text-[#111] capitalize">
                {pokemon?.abilities
                  ?.map((a: { ability: { name: string; }; }) => a.ability.name)
                  .join(", ") ?? "—"}
              </Text>
            </View>

            <View className="flex-row justify-between py-[10px] border-t border-t-[#ddd]">
              <Text className="font-black text-[#333]">Types</Text>
              <Text className="font-extrabold text-[#111] capitalize">
                {pokemon.types.map((t) => t.type.name).join(", ")}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </PokedexFrame>
  );
}
