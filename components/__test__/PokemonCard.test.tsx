import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import PokemonCard from "../PokemonCard";

describe("PokemonCard", () => {
  it("renders the Pokémon name", () => {
    const { getByText } = render(
      <PokemonCard name="pikachu" selected={false} onPress={() => {}} />
    );
    expect(getByText("pikachu")).toBeTruthy();
  });

  it("applies selected styles when selected", () => {
    const { getByText } = render(
      <PokemonCard name="bulbasaur" selected={true} onPress={() => {}} />
    );
    expect(getByText("bulbasaur")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = vi.fn();
    const { getByText } = render(
      <PokemonCard name="charmander" selected={false} onPress={onPressMock} />
    );

    const card = getByText("charmander");

    // web equivalent of "press"
    fireEvent.click(card);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
