// components/pokedex/PokedexFrame.tsx
import React, { ReactNode } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

type Props = {
  title?: string;
  children: ReactNode; // the big white screen content
  footer?: ReactNode;  // the gray control panel content
};

export default function PokedexFrame({ title = "POKÉDEX", children, footer }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.shell}>
        {/* Top red header */}
        <View style={styles.top}>
          <View style={styles.topRow}>
            {/* Big blue light */}
            <View style={styles.bigBlueOuter}>
              <View style={styles.bigBlueInner} />
            </View>

            {/* Small lights */}
            <View style={styles.smallLights}>
              <View style={[styles.dot, { backgroundColor: "#ff3b3b" }]} />
              <View style={[styles.dot, { backgroundColor: "#ffd84d" }]} />
              <View style={[styles.dot, { backgroundColor: "#38d86b" }]} />
            </View>

            {/* Title */}
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>

        {/* Big white screen */}
        <View style={styles.screenWrap}>
          <View style={styles.screenInset}>{children}</View>
        </View>

        {/* Bottom control panel */}
        <View style={styles.control}>{footer}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#111" },

  // Red device body
  shell: {
    flex: 1,
    margin: 10,
    borderRadius: 22,
    backgroundColor: "#e31919",
    borderWidth: 4,
    borderColor: "#0c0c0c",
    overflow: "hidden",
  },

  // Header area
  top: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  // Blue light
  bigBlueOuter: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "#bfe8ff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#0c0c0c",
  },
  bigBlueInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#33c7ff",
    borderWidth: 2,
    borderColor: "#0c0c0c",
  },

  // Small lights
  smallLights: { flexDirection: "row", gap: 6 },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#0c0c0c",
  },

  // Title
  title: {
    marginLeft: "auto",
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: "900",
    color: "#111",
  },

  // White screen area
  screenWrap: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  screenInset: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    borderWidth: 3,
    borderColor: "#0c0c0c",
    borderRadius: 10,
    overflow: "hidden",
  },

  // Bottom panel area
  control: {
    backgroundColor: "#3b3b3b",
    borderTopWidth: 4,
    borderTopColor: "#0c0c0c",
    padding: 14,
  },
});
