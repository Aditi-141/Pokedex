import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import SearchBar from "./ui/SearchBar";

export default function PokedexFooter({
  query,
  setQuery,
  searchRef,
  onUp,
  onDown,
  onLeft,
  onRight,
  onCenter,
  onAccept,
  onReject,
}: {
  query: string;
  setQuery: (t: string) => void;
  searchRef: React.RefObject<TextInput | null>;
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
  onCenter: () => void;
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <View style={styles.wrapper}>
      {/* Green screen */}
      <View style={styles.topArea}>
        <View style={styles.greenScreen}>
          <SearchBar
            ref={searchRef}
            value={query}
            onChangeText={setQuery}
            placeholder="Search by name…"
          />
        </View>
      </View>

      {/* Controls row */}
      <View style={styles.controlsRow}>
        {/* D-pad */}
        <View style={styles.dpad}>
          <View style={styles.dpadRow}>
            <View style={styles.dpadSpacer} />
            <Pressable onPress={onUp} style={styles.dpadKey}>
              <Text style={styles.dpadText}>↑</Text>
            </Pressable>
            <View style={styles.dpadSpacer} />
          </View>

          <View style={styles.dpadRow}>
            <Pressable onPress={onLeft} style={styles.dpadKey}>
              <Text style={styles.dpadText}>←</Text>
            </Pressable>

            <Pressable onPress={onCenter} style={styles.dpadKeyCenter}>
              <Text style={styles.dpadText}>O</Text>
            </Pressable>

            <Pressable onPress={onRight} style={styles.dpadKey}>
              <Text style={styles.dpadText}>→</Text>
            </Pressable>
          </View>

          <View style={styles.dpadRow}>
            <View style={styles.dpadSpacer} />
            <Pressable onPress={onDown} style={styles.dpadKey}>
              <Text style={styles.dpadText}>↓</Text>
            </Pressable>
            <View style={styles.dpadSpacer} />
          </View>
        </View>

        {/* Accept / Reject */}
        <View style={styles.actions}>
          <Pressable onPress={onReject} style={styles.reject}>
            <Text style={styles.actionText}>X</Text>
          </Pressable>
          <Pressable onPress={onAccept} style={styles.accept}>
            <Text style={styles.actionText}>O</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },

  topArea: {
    // keeps green screen from stretching weirdly
  },

  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  greenScreen: {
    backgroundColor: "#b9d66a",
    borderWidth: 3,
    borderColor: "#0c0c0c",
    borderRadius: 12,
    padding: 10,
    gap: 8,
  },
  greenHint: { fontWeight: "800", color: "#1a1a1a" },

  // D-pad
  dpad: {
    padding: 6,
    backgroundColor: "#2f2f2f",
    borderWidth: 3,
    borderColor: "#0c0c0c",
    borderRadius: 12,
  },
  dpadRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginVertical: 3,
  },
  dpadSpacer: { width: 46, height: 46 },
  dpadKey: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#4a4a4a",
    borderWidth: 2,
    borderColor: "#0c0c0c",
    alignItems: "center",
    justifyContent: "center",
  },
  dpadKeyCenter: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#3a3a3a",
    borderWidth: 2,
    borderColor: "#0c0c0c",
    alignItems: "center",
    justifyContent: "center",
  },
  dpadText: { color: "#eaeaea", fontWeight: "900", fontSize: 16 },

  actions: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  reject: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#e31919",
    borderWidth: 3,
    borderColor: "#0c0c0c",
    alignItems: "center",
    justifyContent: "center",
  },
  accept: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#38d86b",
    borderWidth: 3,
    borderColor: "#0c0c0c",
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: { fontSize: 22, fontWeight: "900", color: "#0c0c0c" },
});
