// app/index.test.tsx
import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Router mock
const pushMock = vi.fn();
vi.mock("expo-router", () => ({
  useRouter: () => ({ push: pushMock }),
}));

//  Frame mock (renders title + children + footer in DOM)
vi.mock("../components/PokedexFrame", () => ({
  default: ({ title, children, footer }: any) => (
    <div>
      <h1>{title}</h1>
      <div data-testid="frame-children">{children}</div>
      <div data-testid="frame-footer">{footer}</div>
    </div>
  ),
}));

let lastFooterProps: any = null;
vi.mock("../components/PokedexFooter", () => ({
  default: (props: any) => {
    lastFooterProps = props;
    return <div data-testid="pokedex-footer" />;
  },
}));

let lastListProps: any = null;
vi.mock("../components/PokemonList", () => ({
  default: (props: any) => {
    lastListProps = props;
    return (
      <div data-testid="pokemon-list">
        {props.data?.map((p: any, i: number) => (
          <div key={p.name} data-testid={`row-${i}`}>
            {p.name}
          </div>
        ))}
      </div>
    );
  },
}));

import PokedexScreen from "./index";

function mockFetchOnce(results: Array<{ name: string; url: string }>) {
  (globalThis as any).fetch = vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValue({ results }),
  });
}

describe("app/index (PokedexScreen)", () => {
  beforeEach(() => {
    pushMock.mockClear();
    lastFooterProps = null;
    lastListProps = null;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows loading state initially, then renders list after fetch", async () => {
    mockFetchOnce([
      { name: "bulbasaur", url: "u1" },
      { name: "ivysaur", url: "u2" },
    ]);

    render(<PokedexScreen />);

    expect(screen.getByText("Loading Pokémon…")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByTestId("pokemon-list")).toBeInTheDocument());

    expect(screen.queryByText("Loading Pokémon…")).not.toBeInTheDocument();
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("ivysaur")).toBeInTheDocument();
  });

  it("filters list based on query via footer setQuery", async () => {
    mockFetchOnce([
      { name: "bulbasaur", url: "u1" },
      { name: "charmander", url: "u2" },
      { name: "squirtle", url: "u3" },
    ]);

    render(<PokedexScreen />);
    await waitFor(() => expect(screen.getByTestId("pokemon-list")).toBeInTheDocument());

    expect(lastFooterProps).toBeTruthy();

    act(() => {
      lastFooterProps.setQuery("char");
    });

    await waitFor(() => {
      expect(screen.getByText("charmander")).toBeInTheDocument();
      expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
      expect(screen.queryByText("squirtle")).not.toBeInTheDocument();
    });
  });

  it("Accept opens selected pokemon (router.push) using filtered list", async () => {
    mockFetchOnce([
      { name: "bulbasaur", url: "u1" },
      { name: "charmander", url: "u2" },
      { name: "squirtle", url: "u3" },
    ]);

    render(<PokedexScreen />);
    await waitFor(() => expect(screen.getByTestId("pokemon-list")).toBeInTheDocument());

    act(() => {
      lastFooterProps.setQuery("squ");
    });

    await waitFor(() => expect(screen.getByText("squirtle")).toBeInTheDocument());

    act(() => {
      lastFooterProps.onAccept();
    });

    expect(pushMock).toHaveBeenCalledWith("/pokemon/squirtle");
  });

  it("Reject clears query and scrolls to top if listRef has scrollToIndex", async () => {
    mockFetchOnce([
      { name: "bulbasaur", url: "u1" },
      { name: "charmander", url: "u2" },
    ]);

    render(<PokedexScreen />);
    await waitFor(() => expect(screen.getByTestId("pokemon-list")).toBeInTheDocument());

    // Provide scrollToIndex on the actual listRef passed to PokemonList
    lastListProps.listRef.current = { scrollToIndex: vi.fn() };

    act(() => {
      lastFooterProps.setQuery("char");
    });

    await waitFor(() => expect(screen.getByText("charmander")).toBeInTheDocument());

    act(() => {
      lastFooterProps.onReject();
    });

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("charmander")).toBeInTheDocument();
    });

    expect(lastListProps.listRef.current.scrollToIndex).toHaveBeenCalledWith({
      index: 0,
      animated: true,
      viewPosition: 0.5,
    });
  });

  it("PokemonList onSelectAndOpen navigates to that pokemon", async () => {
    mockFetchOnce([
      { name: "bulbasaur", url: "u1" },
      { name: "charmander", url: "u2" },
      { name: "squirtle", url: "u3" },
    ]);

    render(<PokedexScreen />);
    await waitFor(() => expect(screen.getByTestId("pokemon-list")).toBeInTheDocument());

    expect(lastListProps).toBeTruthy();

    act(() => {
      lastListProps.onSelectAndOpen(1); // charmander
    });

    expect(pushMock).toHaveBeenCalledWith("/pokemon/charmander");
  });

  it("Center focuses search input if searchRef.current.focus exists", async () => {
    mockFetchOnce([{ name: "bulbasaur", url: "u1" }]);

    render(<PokedexScreen />);
    await waitFor(() => expect(screen.getByTestId("pokemon-list")).toBeInTheDocument());

    const focus = vi.fn();
    lastFooterProps.searchRef.current = { focus };

    act(() => {
      lastFooterProps.onCenter();
    });

    expect(focus).toHaveBeenCalledTimes(1);
  });
});
