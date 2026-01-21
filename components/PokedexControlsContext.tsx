import React, { createContext, useContext } from "react";
import type { TextInput } from "react-native";

type PokedexControls = {
  query: string;
  setQuery: (v: string) => void;
  searchRef: React.RefObject<TextInput | null>;
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
  onCenter: () => void;
  onAccept: () => void;
  onReject: () => void;
};

const Ctx = createContext<PokedexControls | null>(null);

export function PokedexControlsProvider({
  value,
  children,
}: {
  value: PokedexControls;
  children: React.ReactNode;
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePokedexControls() {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePokedexControls must be used inside provider");
  return v;
}
