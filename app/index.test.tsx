// app/index.test.tsx
(global as any).__DEV__ = true;

import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ---------- ROUTER MOCK ----------
const pushMock = vi.fn();
vi.mock("expo-router", () => ({
  useRouter: () => ({ push: pushMock }),
}));

// ---------- SERVICE MOCK (IMPORTANT) ----------
const fetchPokemonListMock = vi.fn();
vi.mock("./services/pokemonServices", () => ({
  fetchPokemonList: (...args: any[]) => fetchPokemonListMock(...args),
}));

// ---------- COMPONENT MOCKS ----------

// Frame mock
vi.mock("../components/PokedexFrame", () => ({
  default: ({ title, children, footer }: any) => (
    <div>
      <h1>{title}</h1>
      <div data-testid="frame-children">{children}</div>
      <div data-testid="frame-footer">{footer}</div>
    </div>
  ),
}));

// PokemonList mock (capture props + render list)
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

// Footer mock
let lastControls: any = null;
vi.mock("../components/PokedexFooter", async () => {
  const React = (await import("react")) as any;
  const ctx = await import("../components/PokedexControlsContext");
  return {
    default: () => {
      const controls = ctx.usePokedexControls();
      lastControls = controls;
      return <div data-testid="pokedex-footer" />;
    },
  };
});

// ---------- POKEDEX SCREEN ----------
import PokedexScreen from "./index";

// ---------- HELPER ----------
function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

// ---------- TESTS ----------
describe("app/index (PokedexScreen)", () => {
  beforeEach(() => {
    pushMock.mockClear();
    fetchPokemonListMock.mockReset();
    lastListProps = null;
    lastControls = null;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows loading state initially, then renders list after fetch", async () => {
    fetchPokemonListMock.mockResolvedValueOnce([
      { name: "bulbasaur", url: "u1" },
      { name: "ivysaur", url: "u2" },
    ]);

    renderWithQueryClient(<PokedexScreen />);

    expect(screen.getByText("Loading Pokemon…")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByTestId("pokemon-list")).toBeInTheDocument());

    expect(screen.queryByText("Loading Pokemon…")).not.toBeInTheDocument();
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("ivysaur")).toBeInTheDocument();
  });

  it("filters list based on query via footer setQuery", async () => {
    fetchPokemonListMock.mockResolvedValueOnce([
      { name: "bulbasaur", url: "u1" },
      { name: "charmander", url: "u2" },
      { name: "squirtle", url: "u3" },
    ]);

    renderWithQueryClient(<PokedexScreen />);
    await waitFor(() => expect(screen.getByTestId("pokemon-list")).toBeInTheDocument());

    expect(lastControls).toBeTruthy();

    act(() => {
      lastControls.setQuery("char");
    });

    await waitFor(() => {
      expect(screen.getByText("charmander")).toBeInTheDocument();
      expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
      expect(screen.queryByText("squirtle")).not.toBeInTheDocument();
    });
  });

  it("Accept opens selected pokemon (router.push) using filtered list", async () => {
    fetchPokemonListMock.mockResolvedValueOnce([
      { name: "bulbasaur", url: "u1" },
      { name: "charmander", url: "u2" },
      { name: "squirtle", url: "u3" },
    ]);

    renderWithQueryClient(<PokedexScreen />);
    await waitFor(() => expect(screen.getByTestId("pokemon-list")).toBeInTheDocument());

    act(() => lastControls.setQuery("squ"));

    await waitFor(() => expect(screen.getByText("squirtle")).toBeInTheDocument());

    act(() => lastControls.onAccept());

    expect(pushMock).toHaveBeenCalledWith("/pokemon/squirtle");
  });

  it("Reject clears query and scrolls to top if listRef has scrollToIndex", async () => {
    fetchPokemonListMock.mockResolvedValueOnce([
      { name: "bulbasaur", url: "u1" },
      { name: "charmander", url: "u2" },
    ]);

    renderWithQueryClient(<PokedexScreen />);
    await waitFor(() => expect(screen.getByTestId("pokemon-list")).toBeInTheDocument());

    // emulate list ref available
    lastListProps.listRef.current = { scrollToIndex: vi.fn() };

    act(() => lastControls.setQuery("char"));
    await waitFor(() => expect(screen.getByText("charmander")).toBeInTheDocument());

    act(() => lastControls.onReject());

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
    fetchPokemonListMock.mockResolvedValueOnce([
      { name: "bulbasaur", url: "u1" },
      { name: "charmander", url: "u2" },
      { name: "squirtle", url: "u3" },
    ]);

    renderWithQueryClient(<PokedexScreen />);
    await waitFor(() => expect(screen.getByTestId("pokemon-list")).toBeInTheDocument());

    act(() => lastListProps.onSelectAndOpen(1)); // charmander

    expect(pushMock).toHaveBeenCalledWith("/pokemon/charmander");
  });

  it("Center focuses search input if searchRef.current.focus exists", async () => {
    fetchPokemonListMock.mockResolvedValueOnce([{ name: "bulbasaur", url: "u1" }]);

    renderWithQueryClient(<PokedexScreen />);
    await waitFor(() => expect(screen.getByTestId("pokemon-list")).toBeInTheDocument());

    const focus = vi.fn();
    // use the ref from context (created in screen)
    lastControls.searchRef.current = { focus };

    act(() => lastControls.onCenter());

    expect(focus).toHaveBeenCalledTimes(1);
  });
});
