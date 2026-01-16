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
      className={[
        "bg-white border-2 border-[#0c0c0c] rounded-[12px] py-[14px] px-[14px] mb-[10px] flex-row items-center justify-between",
        selected && "bg-[#e7d247] border-[3px] ",
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
