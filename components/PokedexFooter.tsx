// PokedexFooter.tsx
import {
  Check,
  CircleDot,
  MoveDown,
  MoveLeft,
  MoveRight,
  MoveUp,
  X,
} from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import ControllerButton from "./ControllerButton";
import { usePokedexControls } from "./PokedexControlsContext";
import SearchBar from "./ui/SearchBar";

const PokedexFooter: React.FC = () => {
  const {
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
  } = usePokedexControls();

  return (
    <View className="gap-3">
      {/* Search */}
      <View className="bg-[#e5f8b5] rounded-xl p-2 gap-2">
        <SearchBar
          ref={searchRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Search by name…"
        />
      </View>

      {/* Controls row */}
      <View className="flex-row justify-between items-center">
        {/* D-pad */}
        <View className="p-1 bg-[#727272] border-3 border-[#0c0c0c] rounded-xl">
          {/* Row 1 */}
          <View className="flex-row justify-center items-center gap-1 my-1">
            <View className="w-11 h-11" />
            <ControllerButton
              onPress={onUp}
              icon={<MoveUp size={24} />}
              testID="dpad-up"
            />
            <View className="w-11 h-11" />
          </View>

          {/* Row 2 */}
          <View className="flex-row justify-center items-center gap-1 my-1">
            <ControllerButton
              onPress={onLeft}
              icon={<MoveLeft size={24} />}
              testID="dpad-left"
            />
            <ControllerButton
              onPress={onCenter}
              icon={<CircleDot size={24} />}
              bgColor="#3a3a3a"
              testID="dpad-center"
            />
            <ControllerButton
              onPress={onRight}
              icon={<MoveRight size={24} />}
              testID="dpad-right"
            />
          </View>

          {/* Row 3 */}
          <View className="flex-row justify-center items-center gap-1 my-1">
            <View className="w-11 h-11" />
            <ControllerButton
              onPress={onDown}
              icon={<MoveDown size={24} />}
              testID="dpad-down"
            />
            <View className="w-11 h-11" />
          </View>
        </View>

        {/* Accept / Reject */}
        <View className="items-center justify-center gap-2.5">
          <ControllerButton
            onPress={onReject}
            icon={<X color="#0c0c0c" size={28} />}
            size={56}
            bgColor="#e31919"
            testID="btn-reject"
          />
          <ControllerButton
            onPress={onAccept}
            icon={<Check color="#0c0c0c" size={28} />}
            size={56}
            bgColor="#38d86b"
            testID="btn-accept"
          />
        </View>
      </View>
    </View>
  );
};

export default PokedexFooter;
