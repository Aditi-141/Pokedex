import React, { forwardRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
};

const SearchBar = forwardRef<TextInput, Props>(
  ({ value, onChangeText, placeholder }, ref) => {
    return (
      <View style={styles.wrap}>
        <Text style={styles.icon}>⌕</Text>
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder ?? "Search Pokémon..."}
          placeholderTextColor="#2e3a1f"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          returnKeyType="search"
        />
      </View>
    );
  }
);

SearchBar.displayName = "SearchBar";
export default SearchBar;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#b9d66a",
    borderWidth: 2,
    borderColor: "#2a2a2a",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
    color: "#1b1b1b",
    fontWeight: "700",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#121212",
    paddingVertical: 0,
  },
});
