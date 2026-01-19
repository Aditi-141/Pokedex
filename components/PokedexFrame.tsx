// components/pokedex/PokedexFrame.tsx
import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PokedexFrameProps = {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  
};

export default function PokedexFrame({
  title = "POKEDEX",
  children,
  footer,
}: PokedexFrameProps) {
  return (
    <SafeAreaView className="flex-1  bg-[#c01e1e] ">
      {/* Red device body */}
      <View className="flex-1 m-[10px] rounded-[22px] bg-[#c01e1e] overflow-hidden">
        {/* Top header */}
        <View className="px-[14px] pt-[10px] pb-[12px]">
          <View className="flex-row items-center gap-[10px]">
            {/* Big blue light */}
            <View className="w-[66px] h-[66px] rounded-[33px] bg-[#bfe8ff] items-center justify-center">
              <View className="w-[52px] h-[52px] rounded-[26px] bg-[#33c7ff]" />
            </View>

            {/* Small lights */}
            <View className="flex-row gap-[6px]">
              <View className="w-[12px] h-[12px] rounded-[6px] bg-[#ff3b3b]" />
              <View className="w-[12px] h-[12px] rounded-[6px] bg-[#ffd84d]" />
              <View className="w-[12px] h-[12px] rounded-[6px] bg-[#38d86b]" />
            </View>

            {/* Title */}
            <Text className="ml-auto text-[18px] tracking-[1px] font-black text-[#111]">
              {title}
            </Text>
          </View>
        </View>

        {/* White screen  */}
        <View className="flex-1 px-[16px] pb-[10px]">
          <View className="flex-1 bg-[#f7f7f7] border-[3px] rounded-[10px] overflow-hidden">
            {children}
          </View>
        </View>

        {/* Bottom control panel*/}
        {footer ? (
          <View className="bg-[#3b3b3b] border-t-4 border-t-[#0c0c0c] p-[14px]">
            {footer}
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
