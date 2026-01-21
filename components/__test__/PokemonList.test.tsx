// components/__test__/PokemonList.test.tsx
import { render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock react-native -> DOM
vi.mock("react-native", () => ({
  View: (props: any) => <div {...props} />,
  Text: (props: any) => <span {...props} />,
}));

vi.mock("@legendapp/list", () => ({
  LegendList: ({ data, renderItem, ListEmptyComponent }: any) => {
    if (!data || data.length === 0) return ListEmptyComponent ?? null;
    return (
      <div data-testid="legend-list">
        {data.map((item: any, index: number) => (
          <div key={item.name ?? index}>{renderItem({ item, index })}</div>
        ))}
      </div>
    );
  },
}));

// Mock PokemonCard -> clickable DOM button
vi.mock("../PokemonCard", () => ({
  default: ({ name, selected, onPress }: any) => (
    <button
      data-testid={`pokemon-card-${String(name).toLowerCase()}`}
      data-selected={selected ? "true" : "false"}
      onClick={onPress}
    >
      {name}
    </button>
  ),
}));

import PokemonList from "../PokemonList";

describe("PokemonList", () => {
  const mockData = [
    { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
  ];

  const mockOnSelectAndOpen = vi.fn();
  const mockListRef = { current: null } as any;

  beforeEach(() => {
    mockOnSelectAndOpen.mockClear();
  });

  it("renders a list of Pokemon", () => {
    render(
      <PokemonList
        data={mockData}
        selectedIndex={0}
        listRef={mockListRef}
        onSelectAndOpen={mockOnSelectAndOpen}
        query=""
      />
    );

    expect(screen.getByText("Bulbasaur")).toBeTruthy();
    expect(screen.getByText("Charmander")).toBeTruthy();
  });

  it("calls onSelectAndOpen when a Pokemon is pressed", () => {
    render(
      <PokemonList
        data={mockData}
        selectedIndex={0}
        listRef={mockListRef}
        onSelectAndOpen={mockOnSelectAndOpen}
        query=""
      />
    );

    screen.getByTestId("pokemon-card-charmander").click();
    expect(mockOnSelectAndOpen).toHaveBeenCalledWith(1);
  });

  it("renders empty state when data is empty", () => {
    render(
      <PokemonList
        data={[]}
        selectedIndex={0}
        listRef={mockListRef}
        onSelectAndOpen={mockOnSelectAndOpen}
        query="Pikachu"
      />
    );

    expect(screen.getByText('No matches for “Pikachu”')).toBeTruthy();
  });

  it("marks the selected Pokemon", () => {
    render(
      <PokemonList
        data={mockData}
        selectedIndex={1}
        listRef={mockListRef}
        onSelectAndOpen={mockOnSelectAndOpen}
        query=""
      />
    );

    const selected = screen.getByTestId("pokemon-card-charmander");
    expect(selected.getAttribute("data-selected")).toBe("true");
  });
});
