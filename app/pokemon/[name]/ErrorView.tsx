import React from "react";
import { Pressable, Text, View } from "react-native";

interface ErrorViewProps {
  error?: unknown;
  onRetry: () => void;
  isRetrying: boolean;
  onBack: () => void;
}

export default function ErrorView({ error, onRetry, isRetrying, onBack }: ErrorViewProps) {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="font-black text-[#333] text-center mb-3">
        Couldn't load Pokémon details
      </Text>
      <Text className="text-[#666] text-center mb-4">
        {error instanceof Error ? error.message : "Unknown error"}
      </Text>

      <Pressable
        onPress={onRetry}
        className="w-full h-[56px] rounded-[10px] bg-[#f38b8b] items-center justify-center"
      >
        <Text className="font-black text-[#333]">
          {isRetrying ? "Retrying..." : "Retry"}
        </Text>
      </Pressable>

      <Pressable onPress={onBack} className="mt-3">
        <Text className="font-bold text-[#1e90ff]">Back</Text>
      </Pressable>
    </View>
  );
}
