import React from "react";
import { Text, View } from "react-native";

interface InfoRowProps {
  label: string;
  value: string | number;
  valueColor?: string;
  isAlternate?: boolean;
}

export default function InfoRow({
  label,
  value,
  valueColor = "#000",
  isAlternate = false,
}: InfoRowProps) {
  return (
    <View
      className={`flex-row justify-between py-[10px] border-t border-[#ddd] ${
        isAlternate ? "bg-slate-100" : "bg-slate-200"
      }`}
    >
      <Text className="font-black text-[#4e4c4c] pl-[10px]">{label}</Text>
      <Text className="font-extrabold pr-[10px]" style={{ color: valueColor }}>
        {value}
      </Text>
    </View>
  );
}
