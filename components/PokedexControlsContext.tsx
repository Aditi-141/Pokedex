import React, { createContext, useContext } from "react";
import { PokedexControls } from "../app/types/types";

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
