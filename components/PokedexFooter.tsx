import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
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
    <View className="gap-[12px]">
      {/* Green screen */}
      <View>
        <View className="bg-[#b9d66a] border-[3px] border-[#0c0c0c] rounded-[12px] p-[10px] gap-[8px]">
          <SearchBar
            ref={searchRef}
            value={query}
            onChangeText={setQuery}
            placeholder="Search by name…"
          />
        </View>
      </View>

      {/* Controls row */}
      <View className="flex-row items-center justify-between">
        {/* D-pad */}
        <View className="p-[6px] bg-[#2f2f2f] border-[3px] border-[#0c0c0c] rounded-[12px]">
          {/* Row 1 */}
          <View className="flex-row items-center justify-center gap-[6px] my-[3px]">
            <View className="w-[46px] h-[46px]" />
            <Pressable
              onPress={onUp}
              className="w-[46px] h-[46px] rounded-[10px] bg-[#4a4a4a] border-2 border-[#0c0c0c] items-center justify-center"
            >
              <Text className="text-[#eaeaea] font-black text-[16px]">↑</Text>
            </Pressable>
            <View className="w-[46px] h-[46px]" />
          </View>

          {/* Row 2 */}
          <View className="flex-row items-center justify-center gap-[6px] my-[3px]">
            <Pressable
              onPress={onLeft}
              className="w-[46px] h-[46px] rounded-[10px] bg-[#4a4a4a] border-2 border-[#0c0c0c] items-center justify-center"
            >
              <Text className="text-[#eaeaea] font-black text-[16px]">←</Text>
            </Pressable>

            <Pressable
              onPress={onCenter}
              className="w-[46px] h-[46px] rounded-[10px] bg-[#3a3a3a] border-2 border-[#0c0c0c] items-center justify-center"
            >
              <Text className="text-[#eaeaea] font-black text-[16px]">●</Text>
            </Pressable>

            <Pressable
              onPress={onRight}
              className="w-[46px] h-[46px] rounded-[10px] bg-[#4a4a4a] border-2 border-[#0c0c0c] items-center justify-center"
            >
              <Text className="text-[#eaeaea] font-black text-[16px]">→</Text>
            </Pressable>
          </View>

          {/* Row 3 */}
          <View className="flex-row items-center justify-center gap-[6px] my-[3px]">
            <View className="w-[46px] h-[46px]" />
            <Pressable
              onPress={onDown}
              className="w-[46px] h-[46px] rounded-[10px] bg-[#4a4a4a] border-2 border-[#0c0c0c] items-center justify-center"
            >
              <Text className="text-[#eaeaea] font-black text-[16px]">↓</Text>
            </Pressable>
            <View className="w-[46px] h-[46px]" />
          </View>
        </View>

        {/* Accept / Reject */}
        <View className="items-center justify-center gap-[10px]">
          <Pressable
            onPress={onReject}
            className="w-[56px] h-[56px] rounded-[28px] bg-[#e31919] border-[3px] border-[#0c0c0c] items-center justify-center"
          >
            <Text className="text-[22px] font-black text-[#0c0c0c]">✖</Text>
          </Pressable>

          <Pressable
            onPress={onAccept}
            className="w-[56px] h-[56px] rounded-[28px] bg-[#38d86b] border-[3px] border-[#0c0c0c] items-center justify-center"
          >
            <Text className="text-[22px] font-black text-[#0c0c0c]">✔</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
