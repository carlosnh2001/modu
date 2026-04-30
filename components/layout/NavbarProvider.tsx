"use client";

import { createContext, useContext, useState, useCallback } from "react";

type NavbarCtx = {
  isDark: boolean;
  setDark: (v: boolean) => void;
};

const Ctx = createContext<NavbarCtx>({ isDark: false, setDark: () => {} });

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const setDark = useCallback((v: boolean) => setIsDark(v), []);
  return <Ctx.Provider value={{ isDark, setDark }}>{children}</Ctx.Provider>;
}

export function useNavbarColor() {
  return useContext(Ctx);
}
