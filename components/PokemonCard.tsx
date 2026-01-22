import React from "react";
import { Pressable, Text } from "react-native";

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
      testID={`pokemon-item-${name.toLowerCase()}`}
      accessibilityLabel={`pokemon-item-${name.toLowerCase()}`}
      accessibilityRole="button"
      accessible
      className={[
        "bg-[#ebeef3] border-0 rounded-[12px] py-[14px] px-[14px] mb-[10px] flex-row items-center justify-between",
        selected && "bg-[#eee090]",
      ].join(" ")}
      style={({ pressed }) => [
        pressed && { transform: [{ scale: 0.99 }] },
      ]}
    >
      <Text
        className={[
          "text-[18px] font-black capitalize text-[#111]",
          selected && "text-[#111]",
        ].join(" ")}
      >
        {name}
      </Text>
    </Pressable>
  );
}
