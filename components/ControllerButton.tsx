import React from "react";
import { Pressable } from "react-native";
import { ControllerButtonProps } from "../app/types";


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
