import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PokemonCard({
  name,
  selected,
  onPress,
}: {
  name: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && { transform: [{ scale: 0.99 }] },
      ]}
    >
      <Text style={[styles.name, selected && styles.nameSelected]}>{name}</Text>
      <View style={[styles.viewBtn, selected && styles.viewBtnSelected]}>
        <Text style={styles.viewBtnText}>VIEW</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#0c0c0c",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardSelected: { backgroundColor: "#fff7c2", borderWidth: 3 },
  name: { fontSize: 18, fontWeight: "900", textTransform: "capitalize", color: "#111" },
  nameSelected: { color: "#111" },

  viewBtn: {
    backgroundColor: "#e31919",
    borderWidth: 2,
    borderColor: "#0c0c0c",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  viewBtnSelected: { backgroundColor: "#ff2a2a" },
  viewBtnText: { color: "#111", fontWeight: "900", letterSpacing: 1 },
});
