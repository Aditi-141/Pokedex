// app/pokemon/[name]/__test__/index.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import "@testing-library/jest-dom";

vi.mock("react-native", () => ({
  View: (props: any) => <div {...props} />,
  Text: (props: any) => <span {...props} />,
  ScrollView: (props: any) => <div {...props} />,
  ActivityIndicator: (props: any) => <div data-testid="spinner" {...props} />,
  Image: (props: any) => (
    <img data-testid="pokemon-image" alt="pokemon" src={props?.source?.uri ?? ""} />
  ),
  Pressable: (props: any) => (
    <button data-testid={props["data-testid"] ?? undefined} onClick={props.onPress}>
      {props.children}
    </button>
  ),
}));

// --------------------
// Mock expo-router
// --------------------
const backMock = vi.fn();
const replaceMock = vi.fn();
const canGoBackMock = vi.fn();
const useLocalSearchParamsMock = vi.fn();

vi.mock("expo-router", () => ({
  useRouter: () => ({
    back: backMock,
    replace: replaceMock,
    canGoBack: canGoBackMock,
  }),
  useLocalSearchParams: () => useLocalSearchParamsMock(),
}));

// --------------------
// Mock react-query useQuery
// --------------------
const useQueryMock = vi.fn();
vi.mock("@tanstack/react-query", () => ({
  useQuery: (args: any) => useQueryMock(args),
}));

// --------------------
// Mock PokedexFrame
// --------------------
vi.mock("../../../components/PokedexFrame", () => ({
  default: ({ title, children }: any) => (
    <div>
      <h1 data-testid="frame-title">{title}</h1>
      <div data-testid="frame-children">{children}</div>
    </div>
  ),
}));

// --------------------
// Mock service (optional, but keeps imports safe)
// --------------------
const fetchPokemonByNameMock = vi.fn();
vi.mock("../../services/pokemonServices", () => ({
  fetchPokemonByName: (...args: any[]) => fetchPokemonByNameMock(...args),
}));

import PokemonDetailScreen from "../index";

function makePokemon(overrides: any = {}) {
  return {
    id: 25,
    name: "pikachu",
    height: 4,
    weight: 60,
    sprites: { front_default: "http://example.com/pika.png" },
    abilities: [{ ability: { name: "static" } }],
    types: [{ type: { name: "electric" } }],
    stats: [
      { stat: { name: "hp" }, base_stat: 35 },
      { stat: { name: "special-attack" }, base_stat: 50 },
    ],
    ...overrides,
  };
}

describe("PokemonDetailScreen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useLocalSearchParamsMock.mockReturnValue({ name: "pikachu" });
    canGoBackMock.mockReturnValue(true);
  });

  it("renders error state and Retry triggers refetch", () => {
    const refetch = vi.fn();

    useQueryMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error("Network down"),
      refetch,
      isFetching: false,
    });

    render(<PokemonDetailScreen />);

    expect(screen.getByText("Couldn't load Pokémon details")).toBeInTheDocument();
    expect(screen.getByText("Network down")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Retry"));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it("Back uses router.back when canGoBack=true (error state)", () => {
    useQueryMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error("Oops"),
      refetch: vi.fn(),
      isFetching: false,
    });

    render(<PokemonDetailScreen />);

    fireEvent.click(screen.getByText("Back"));
    expect(backMock).toHaveBeenCalledTimes(1);
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("Back uses router.replace('/') when canGoBack=false", () => {
    canGoBackMock.mockReturnValue(false);

    useQueryMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error("Oops"),
      refetch: vi.fn(),
      isFetching: false,
    });

    render(<PokemonDetailScreen />);

    fireEvent.click(screen.getByText("Back"));
    expect(replaceMock).toHaveBeenCalledWith("/");
    expect(backMock).not.toHaveBeenCalled();
  });

  it("renders pokemon details and converts sprite URL to https", () => {
    useQueryMock.mockReturnValue({
      data: makePokemon({
        sprites: { front_default: "http://example.com/pika.png" },
      }),
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isFetching: false,
    });

    render(<PokemonDetailScreen />);

    expect(screen.getByText("25 • pikachu")).toBeInTheDocument();

    expect(screen.getByText("Height")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();

    expect(screen.getByText("Weight")).toBeInTheDocument();
    expect(screen.getByText("60")).toBeInTheDocument();

    expect(screen.getByText("Abilities")).toBeInTheDocument();
    expect(screen.getByText("static")).toBeInTheDocument();

    expect(screen.getByText("Types")).toBeInTheDocument();
    expect(screen.getByText("electric")).toBeInTheDocument();

    expect(screen.getByText("Stats")).toBeInTheDocument();
    expect(screen.getByText("hp")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();

    // "special-attack" -> "special attack"
    expect(screen.getByText("special attack")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();

    const img = screen.getByTestId("pokemon-image") as HTMLImageElement;
    expect(img.getAttribute("src")).toBe("https://example.com/pika.png");
  });

  it("renders 'No sprite available' when sprite is missing", () => {
    useQueryMock.mockReturnValue({
      data: makePokemon({ sprites: { front_default: null } }),
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isFetching: false,
    });

    render(<PokemonDetailScreen />);

    expect(screen.getByText("No sprite available")).toBeInTheDocument();
  });

  it("passes correct queryKey and enabled=true when name is present", () => {
    useLocalSearchParamsMock.mockReturnValue({ name: "Pikachu" });

    useQueryMock.mockReturnValue({
      data: makePokemon(),
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isFetching: false,
    });

    render(<PokemonDetailScreen />);

    expect(useQueryMock).toHaveBeenCalledTimes(1);
    const args = useQueryMock.mock.calls[0][0];

    expect(args.queryKey).toEqual(["pokemon-detail", "pikachu"]);
    expect(args.enabled).toBe(true);
    expect(typeof args.queryFn).toBe("function");
  });

  it("enabled=false when name is missing", () => {
    useLocalSearchParamsMock.mockReturnValue({ name: undefined });

    useQueryMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isFetching: false,
    });

    render(<PokemonDetailScreen />);

    const args = useQueryMock.mock.calls[0][0];
    expect(args.queryKey).toEqual(["pokemon-detail", ""]);
    expect(args.enabled).toBe(false);
  });
});
