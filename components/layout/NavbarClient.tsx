"use client";

import { useNavbarColor } from "./NavbarProvider";
import Navbar from "./Navbar";

export default function NavbarClient() {
  const { isDark } = useNavbarColor();
  return <Navbar dark={isDark} />;
}
