import React from "react";
import { Pressable, Text, View } from "react-native";

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
        selected && "bg-[#fff7c2] border-[3px]",
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

      <View
        className={[
          "bg-[#e31919] border-2 border-[#0c0c0c] px-[12px] py-[6px] rounded-[10px]",
          selected && "bg-[#ff2a2a]",
        ].join(" ")}
      >
        <Text className="text-[#111] font-black tracking-[1px]">VIEW</Text>
      </View>
    </Pressable>
  );
}
