import { render, screen } from "@testing-library/react";
import React from "react";
import { Text, View } from "react-native";
import { describe, expect, it } from "vitest";
import PokedexFrame from "../PokedexFrame";

describe("PokedexFrame", () => {
  it("renders the default title when no title prop is provided", () => {
    render(
      <PokedexFrame>
        <Text>Child content</Text>
      </PokedexFrame>
    );

    expect(screen.getByText("POKEDEX")).toBeInTheDocument();
  });

  it("renders a custom title when title prop is provided", () => {
    render(
      <PokedexFrame title="MY POKEDEX">
        <Text>Child content</Text>
      </PokedexFrame>
    );

    expect(screen.getByText("MY POKEDEX")).toBeInTheDocument();
  });

  it("renders children inside the frame", () => {
    render(
      <PokedexFrame>
        <Text>Child content</Text>
      </PokedexFrame>
    );

    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("renders footer when footer prop is provided", () => {
    render(
      <PokedexFrame
        footer={
          <View>
            <Text>Footer content</Text>
          </View>
        }
      >
        <Text>Child content</Text>
      </PokedexFrame>
    );

    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("does not render footer content when footer prop is not provided", () => {
    render(
      <PokedexFrame>
        <Text>Child content</Text>
      </PokedexFrame>
    );

    expect(screen.queryByText("Footer content")).not.toBeInTheDocument();
  });
});

