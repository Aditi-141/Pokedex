// components/pokedex/PokedexFrame.tsx
import React, { ReactNode } from "react";
import { SafeAreaView, Text, View } from "react-native";

type Props = {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function PokedexFrame({
  title = "POKÉDEX",
  children,
  footer,
}: Props) {
  return (
    <SafeAreaView className="flex-1 bg-[#111]">
      {/* Red device body */}
      <View className="flex-1 m-[10px] rounded-[22px] bg-[#e31919] border-4 border-[#0c0c0c] overflow-hidden">
        {/* Top red header */}
        <View className="px-[14px] pt-[10px] pb-[12px]">
          <View className="flex-row items-center gap-[10px]">
            {/* Big blue light */}
            <View className="w-[66px] h-[66px] rounded-[33px] bg-[#bfe8ff] items-center justify-center border-[3px] border-[#0c0c0c]">
              <View className="w-[52px] h-[52px] rounded-[26px] bg-[#33c7ff] border-2 border-[#0c0c0c]" />
            </View>

            {/* Small lights */}
            <View className="flex-row gap-[6px]">
              <View className="w-[12px] h-[12px] rounded-[6px] border-2 border-[#0c0c0c] bg-[#ff3b3b]" />
              <View className="w-[12px] h-[12px] rounded-[6px] border-2 border-[#0c0c0c] bg-[#ffd84d]" />
              <View className="w-[12px] h-[12px] rounded-[6px] border-2 border-[#0c0c0c] bg-[#38d86b]" />
            </View>

            {/* Title */}
            <Text className="ml-auto text-[18px] tracking-[1px] font-black text-[#111]">
              {title}
            </Text>
          </View>
        </View>

        {/* Big white screen */}
        <View className="flex-1 px-[16px] pb-[10px]">
          <View className="flex-1 bg-[#f7f7f7] border-[3px] border-[#0c0c0c] rounded-[10px] overflow-hidden">
            {children}
          </View>
        </View>

        {/* Bottom control panel */}
        <View className="bg-[#3b3b3b] border-t-4 border-t-[#0c0c0c] p-[14px]">
          {footer}
        </View>
      </View>
    </SafeAreaView>
  );
}
