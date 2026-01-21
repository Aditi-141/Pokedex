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
import { usePokedexControls } from "../app/PokedexControlsContext";
import ControllerButton from "./ControllerButton";
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
    <View style={{ gap: 12 }}>
      {/* Search */}
      <View
        style={{
          backgroundColor: "#e5f8b5",
          borderRadius: 12,
          padding: 10,
          gap: 8,
        }}
      >
        <SearchBar
          ref={searchRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Search by name…"
        />
      </View>

      {/* Controls row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* D-pad */}
        <View
          style={{
            padding: 6,
            backgroundColor: "#727272",
            borderWidth: 3,
            borderColor: "#0c0c0c",
            borderRadius: 12,
          }}
        >
          {/* Row 1 */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
              marginVertical: 3,
            }}
          >
            <View style={{ width: 46, height: 46 }} />
            <ControllerButton onPress={onUp} icon={<MoveUp size={24} />} />
            <View style={{ width: 46, height: 46 }} />
          </View>

          {/* Row 2 */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
              marginVertical: 3,
            }}
          >
            <ControllerButton onPress={onLeft} icon={<MoveLeft size={24} />} />
            <ControllerButton
              onPress={onCenter}
              icon={<CircleDot size={24} />}
              bgColor="#3a3a3a"
            />
            <ControllerButton onPress={onRight} icon={<MoveRight size={24} />} />
          </View>

          {/* Row 3 */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
              marginVertical: 3,
            }}
          >
            <View style={{ width: 46, height: 46 }} />
            <ControllerButton onPress={onDown} icon={<MoveDown size={24} />} />
            <View style={{ width: 46, height: 46 }} />
          </View>
        </View>

        {/* Accept / Reject */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <ControllerButton
            onPress={onReject}
            icon={<X color="#0c0c0c" size={28} />}
            size={56}
            bgColor="#e31919"
          />
          <ControllerButton
            onPress={onAccept}
            icon={<Check color="#0c0c0c" size={28} />}
            size={56}
            bgColor="#38d86b"
          />
        </View>
      </View>
    </View>
  );
};

export default PokedexFooter;
