import React from "react";
import { Pressable, ViewStyle } from "react-native";

interface ControllerButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  size?: number;
  bgColor?: string;
  style?: ViewStyle;
}

const ControllerButton: React.FC<ControllerButtonProps> = ({
  onPress,
  icon,
  size = 46,
  bgColor = "#4a4a4a",
  style,
}) => (
  <Pressable
    onPress={onPress}
    style={[
      {
        width: size,
        height: size,
        borderRadius: size * 0.22,
        backgroundColor: bgColor,
        alignItems: "center",
        justifyContent: "center",
      },
      style,
    ]}
  >
    {icon}
  </Pressable>
);

export default ControllerButton;
