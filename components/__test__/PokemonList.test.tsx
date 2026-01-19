import { render } from "@testing-library/react";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PokemonList, { PokemonListItem } from "../PokemonList";

vi.mock("../PokemonCard", () => {
  return {
    default: ({ name, selected, onPress }: any) => (
      <TouchableOpacity
        onPress={onPress}
        testID={`pokemon-card-${name.toLowerCase()}`}
        accessibilityState={{ selected }}
      >
        <Text>{name}</Text>
      </TouchableOpacity>
    ),
  };
});

describe("PokemonList", () => {
  const mockData: PokemonListItem[] = [
    { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
  ];

  const mockOnSelectAndOpen = vi.fn();
  const mockListRef = { current: null };

  beforeEach(() => {
    mockOnSelectAndOpen.mockClear();
  });

  it("renders a list of Pokemon", () => {
    const { getByText } = render(
      <PokemonList
        data={mockData}
        selectedIndex={0}
        listRef={mockListRef as React.RefObject<any>}
        onSelectAndOpen={mockOnSelectAndOpen}
        query=""
      />
    );

    expect(getByText("Bulbasaur")).toBeTruthy();
    expect(getByText("Charmander")).toBeTruthy();
  });

//   it("calls onSelectAndOpen when a Pokemon is pressed", () => {
//     const { getByTestId } = render(
//       <PokemonList
//         data={mockData}
//         selectedIndex={0}
//         listRef={mockListRef as React.RefObject<any>}
//         onSelectAndOpen={mockOnSelectAndOpen}
//         query=""
//       />
//     );

//     fireEvent.press(getByTestId("pokemon-card-charmander"));
//     expect(mockOnSelectAndOpen).toHaveBeenCalledWith(1);
//   });

  it("renders empty state when data is empty", () => {
    const { getByText } = render(
      <PokemonList
        data={[]}
        selectedIndex={0}
        listRef={mockListRef as React.RefObject<any>}
        onSelectAndOpen={mockOnSelectAndOpen}
        query="Pikachu"
      />
    );

    expect(getByText('No matches for “Pikachu”')).toBeTruthy();
  });

//   it("highlights the selected Pokemon", () => {
//     const { getByTestId } = render(
//       <PokemonList
//         data={mockData}
//         selectedIndex={1} // Charmander is selected
//         listRef={mockListRef as React.RefObject<any>}
//         onSelectAndOpen={mockOnSelectAndOpen}
//         query=""
//       />
//     );

//     const selectedItem = getByTestId("pokemon-card-charmander");
//     expect(selectedItem.props.accessibilityState.selected).toBe(true);
//   });
});
