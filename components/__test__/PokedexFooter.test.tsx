import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("react-native", () => ({
  View: (props: any) => <div {...props} />,
  Text: (props: any) => <span {...props} />,
  TextInput: (props: any) => <input {...props} />,
  Pressable: (props: any) => (
    <button {...props} onClick={props.onPress}>
      {props.children}
    </button>
  ),
}));

vi.mock("lucide-react-native", () => ({
  MoveUp: () => null,
  MoveDown: () => null,
  MoveLeft: () => null,
  MoveRight: () => null,
  CircleDot: () => null,
  X: () => null,
  Check: () => null,
}));

let currentControls: any = null;

vi.mock("../app/PokedexControlsContext", async () => {
  const React = await import("react");

  const Ctx = React.createContext<any>(null);

  const PokedexControlsProvider = ({ value, children }: any) => (
    <Ctx.Provider value={value}>{children}</Ctx.Provider>
  );

  const usePokedexControls = () => {
    const v = React.useContext(Ctx);
    if (!v) throw new Error("usePokedexControls must be used within provider");
    return v;
  };

  return { PokedexControlsProvider, usePokedexControls };
});

// SearchBar mock: DOM input that calls onChangeText
vi.mock("../ui/SearchBar", () => ({
  default: React.forwardRef<any, any>((props, ref) => (
    <input
      ref={ref}
      data-testid="search-bar"
      value={props.value ?? ""}
      placeholder={props.placeholder}
      onChange={(e) => props.onChangeText?.((e.target as HTMLInputElement).value)}
    />
  )),
}));

// ControllerButton mock: DOM button with stable testIDs
vi.mock("../ControllerButton", () => ({
  default: ({ onPress, testID }: any) => (
    <button data-testid={testID ?? "controller-button"} onClick={onPress}>
      BTN
    </button>
  ),
}));

import { PokedexControlsProvider } from "../PokedexControlsContext";
import PokedexFooter from "../PokedexFooter";

describe("PokedexFooter (DOM test)", () => {
  let onUp: any;
  let onDown: any;
  let onLeft: any;
  let onRight: any;
  let onCenter: any;
  let onAccept: any;
  let onReject: any;
  let setQuery: any;

  beforeEach(() => {
    onUp = vi.fn();
    onDown = vi.fn();
    onLeft = vi.fn();
    onRight = vi.fn();
    onCenter = vi.fn();
    onAccept = vi.fn();
    onReject = vi.fn();
    setQuery = vi.fn();
  });

  function renderFooter(query = "") {
    // pass a dummy ref object 
    const searchRef = { current: null as any };

    return render(
      <PokedexControlsProvider
        value={{
          query,
          setQuery,
          searchRef,
          onUp,
          onDown,
          onLeft,
          onRight,
          onCenter,
          onAccept,
          onReject,
        }}
      >
        <PokedexFooter />
      </PokedexControlsProvider>
    );
  }

  it("renders SearchBar with correct value and placeholder", () => {
    renderFooter("pikachu");

    const search = screen.getByTestId("search-bar") as HTMLInputElement;
    expect(search.value).toBe("pikachu");
    expect(search.getAttribute("placeholder")).toBe("Search by name…");
  });

  it("calls setQuery when typing in SearchBar", () => {
    renderFooter("");

    const search = screen.getByTestId("search-bar") as HTMLInputElement;
    fireEvent.change(search, { target: { value: "bulbasaur" } });

    expect(setQuery).toHaveBeenCalledWith("bulbasaur");
  });

  it("calls D-pad handlers and Accept/Reject when buttons are clicked", () => {
    renderFooter("");

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(7);

    // click each one once
    buttons.forEach((b) => fireEvent.click(b));

    expect(onUp).toHaveBeenCalled();
    expect(onDown).toHaveBeenCalled();
    expect(onLeft).toHaveBeenCalled();
    expect(onRight).toHaveBeenCalled();
    expect(onCenter).toHaveBeenCalled();
    expect(onReject).toHaveBeenCalled();
    expect(onAccept).toHaveBeenCalled();
  });
});
