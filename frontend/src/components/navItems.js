import { HeartIcon, HomeIcon, SearchIcon } from "./Icons";

// Itens da navegação principal, compartilhados entre Sidebar e MobileNav.
export const NAV_ITEMS = [
  { to: "/", label: "Início", icon: HomeIcon, end: true },
  { to: "/buscar", label: "Buscar", icon: SearchIcon },
  { to: "/favoritas", label: "Favoritas", icon: HeartIcon },
];
