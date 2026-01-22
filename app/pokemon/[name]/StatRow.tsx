import React from "react";
import { Text, View } from "react-native";

interface StatRowProps {
  name: string;
  value: number;
  isAlternate?: boolean;
}

export default function StatRow({ name, value, isAlternate }: StatRowProps) {
  return (
    <View
      className={`flex-row justify-between py-[8px] px-[10px] ${
        isAlternate ? "bg-slate-100" : "bg-slate-200"
      }`}
    >
      <Text className="font-bold text-[#4e4c4c] capitalize">
        {name.replace("-", " ")}
      </Text>
      <Text className="font-extrabold text-[#1e90ff]">{value}</Text>
    </View>
  );
}
