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
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
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
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View className="flex-1">
          <ScrollView
            contentContainerStyle={{ padding: 14, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Main Card */}
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

              {/* Stats */}
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

          {/* Sticky Back Button */}
          <View className="absolute bottom-0 left-0 right-0 p-[14px] bg-[#f3f3f3] border-t border-[#ddd]">
            <Pressable
              onPress={goBack}
              className="w-full h-[56px] rounded-[10px] bg-[#f38b8b] items-center justify-center"
            >
              <Text className="font-black text-[#333]">Back</Text>
            </Pressable>
          </View>
        </View>
      )}
    </PokedexFrame>
  );
}
