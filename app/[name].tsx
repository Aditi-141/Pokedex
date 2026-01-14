import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import PokedexFrame from "../components/PokedexFrame";

type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
};

const MIN_ID = 1;
const MAX_ID = 151;

export default function PokemonDetailScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();

  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const title = useMemo(() => "POKÉDEX OF ANOMALIES", []);

  const loadByName = (n: string) => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${n}`)
      .then((res) => res.json())
      .then((data: PokemonDetail) => {
        setPokemon(data);
        setCurrentId(data.id);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const loadById = (id: number) => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data: PokemonDetail) => {
        setPokemon(data);
        setCurrentId(data.id);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!name) return;
    loadByName(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const goPrev = () => {
    if (!currentId) return;
    const prev = Math.max(MIN_ID, currentId - 1);
    loadById(prev);
  };

  const goNext = () => {
    if (!currentId) return;
    const next = Math.min(MAX_ID, currentId + 1);
    loadById(next);
  };

  const goBack = () => router.back();

  return (
    <PokedexFrame
      title={title}
      footer={
        <View style={styles.footerRow}>
          <Pressable onPress={goPrev} style={styles.footerBtn}>
            <Text style={styles.footerBtnText}>← PREV</Text>
          </Pressable>

          <Pressable onPress={goBack} style={styles.footerBtn}>
            <Text style={styles.footerBtnText}>✖ BACK</Text>
          </Pressable>

          <Pressable onPress={goNext} style={styles.footerBtn}>
            <Text style={styles.footerBtnText}>NEXT →</Text>
          </Pressable>
        </View>
      }
    >
      {loading || !pokemon ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#e31919" />
          <Text style={styles.loadingText}>Loading…</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 14 }}>
          <View style={styles.card}>
            <Text style={styles.pokeName}>
              #{pokemon.id} • {pokemon.name}
            </Text>

            <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />

            <View style={styles.row}>
              <Text style={styles.label}>Height</Text>
              <Text style={styles.value}>{pokemon.height}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Weight</Text>
              <Text style={styles.value}>{pokemon.weight}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Types</Text>
              <Text style={styles.value}>
                {pokemon.types.map((t) => t.type.name).join(", ")}
              </Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 14, gap: 10 }}>
              <Pressable onPress={goPrev} style={styles.bigNav}>
                <Text style={styles.bigNavText}>←</Text>
              </Pressable>
              <Pressable onPress={goNext} style={styles.bigNav}>
                <Text style={styles.bigNavText}>→</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </PokedexFrame>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#e31919", fontWeight: "700" },

  card: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#0c0c0c",
    borderRadius: 14,
    padding: 14,
  },
  pokeName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111",
    textTransform: "capitalize",
    marginBottom: 12,
  },
  image: { width: 220, height: 220, alignSelf: "center", marginBottom: 12 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  label: { fontWeight: "900", color: "#333" },
  value: { fontWeight: "800", color: "#111", textTransform: "capitalize" },

  footerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  footerBtn: {
    backgroundColor: "#eaeaea",
    borderWidth: 3,
    borderColor: "#0c0c0c",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  footerBtnText: { fontWeight: "900", color: "#111" },

  bigNav: {
    flex: 1,
    backgroundColor: "#e31919",
    borderWidth: 3,
    borderColor: "#0c0c0c",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  bigNavText: { fontSize: 22, fontWeight: "900", color: "#111" },
});
