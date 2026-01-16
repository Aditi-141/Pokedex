import { Search } from "lucide-react-native";
import React, { forwardRef } from "react";
import { TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
};

const SearchBar = forwardRef<TextInput, Props>(
  ({ value, onChangeText, placeholder }, ref) => {
    return (
      <View className="flex-row items-center bg-[#f5f7f2] border-0 border-0 rounded-lg px-2.5 py-2">
        <Search className="text-[#1b1b1b] " size={18} />
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder ?? "Search Pokémon..."}
          placeholderTextColor="#2e3a1f"
          autoCapitalize="none"
          autoCorrect={false}
          className="flex-1 text-base text-[#121212] py-0"
          returnKeyType="search"
        />
      </View>
    );
  }
);

SearchBar.displayName = "SearchBar";
export default SearchBar;
