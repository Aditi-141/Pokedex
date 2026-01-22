import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function LoadingView() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}
