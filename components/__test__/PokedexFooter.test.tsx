// components/__test__/PokedexFooter.test.tsx
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("lucide-react-native", () => ({
  MoveUp: () => null,
  MoveDown: () => null,
  MoveLeft: () => null,
  MoveRight: () => null,
  CircleDot: () => null,
  X: () => null,
  Check: () => null,
}));

// SearchBar mock: plain <input>, uses onChangeText like RN
vi.mock("../ui/SearchBar", () => ({
  default: React.forwardRef<HTMLInputElement, any>((props, ref) => (
    <input
      ref={ref}
      value={props.value ?? ""}
      placeholder={props.placeholder}
      data-testid="search-bar"
      onChange={(e) => props.onChangeText?.((e.target as HTMLInputElement).value)}
    />
  )),
}));

// ControllerButton mock: <button> calling onPress
vi.mock("../ControllerButton", () => ({
  default: ({ onPress }: any) => (
    <button data-testid="controller-button" onClick={onPress}>
      ICON
    </button>
  ),
}));

import PokedexFooter from "../PokedexFooter";

describe("PokedexFooter", () => {
  let onUp: ReturnType<typeof vi.fn>;
  let onDown: ReturnType<typeof vi.fn>;
  let onLeft: ReturnType<typeof vi.fn>;
  let onRight: ReturnType<typeof vi.fn>;
  let onCenter: ReturnType<typeof vi.fn>;
  let onAccept: ReturnType<typeof vi.fn>;
  let onReject: ReturnType<typeof vi.fn>;
  let setQuery: ReturnType<typeof vi.fn>;
  let searchRef: React.RefObject<HTMLInputElement | null>;

  beforeEach(() => {
    onUp = vi.fn();
    onDown = vi.fn();
    onLeft = vi.fn();
    onRight = vi.fn();
    onCenter = vi.fn();
    onAccept = vi.fn();
    onReject = vi.fn();
    setQuery = vi.fn();
    searchRef = React.createRef<HTMLInputElement>();
  });

  const renderFooter = (query = "") =>
    render(
      <PokedexFooter
        query={query}
        setQuery={setQuery as any}
        searchRef={searchRef as any}
        onUp={onUp as any}
        onDown={onDown as any}
        onLeft={onLeft as any}
        onRight={onRight as any}
        onCenter={onCenter as any}
        onAccept={onAccept as any}
        onReject={onReject as any}
      />
    );

  it("renders SearchBar with correct value and placeholder", () => {
    const { getByTestId } = renderFooter("pikachu");

    const searchBar = getByTestId("search-bar") as HTMLInputElement;
    expect(searchBar.value).toBe("pikachu");
    expect(searchBar.getAttribute("placeholder")).toBe("Search by name…");
  });

  it("calls setQuery when typing in SearchBar", () => {
    const { getByTestId } = renderFooter("");

    const searchBar = getByTestId("search-bar") as HTMLInputElement;
    fireEvent.change(searchBar, { target: { value: "bulbasaur" } });

    expect(setQuery).toHaveBeenCalledWith("bulbasaur");
  });

  it("calls D-pad handlers and Accept/Reject when buttons are clicked", () => {
    const { getAllByTestId } = renderFooter("");

    const buttons = getAllByTestId("controller-button");

    expect(buttons.length).toBeGreaterThanOrEqual(7);

    // D-pad assumed order from rendered structure:
    // [0]=Up, [1]=Left, [2]=Center, [3]=Right, [4]=Down
    fireEvent.click(buttons[0]);
    expect(onUp).toHaveBeenCalledTimes(1);

    fireEvent.click(buttons[1]);
    expect(onLeft).toHaveBeenCalledTimes(1);

    fireEvent.click(buttons[2]);
    expect(onCenter).toHaveBeenCalledTimes(1);

    fireEvent.click(buttons[3]);
    expect(onRight).toHaveBeenCalledTimes(1);

    fireEvent.click(buttons[4]);
    expect(onDown).toHaveBeenCalledTimes(1);

    // last two buttons are reject and accept column
    fireEvent.click(buttons[buttons.length - 2]);
    expect(onReject).toHaveBeenCalledTimes(1);

    fireEvent.click(buttons[buttons.length - 1]);
    expect(onAccept).toHaveBeenCalledTimes(1);
  });
});
