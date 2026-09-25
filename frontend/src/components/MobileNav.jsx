import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "./navItems";

// Em telas pequenas a sidebar some e a navegação vai para o rodapé.
function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Principal">
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} className="mobile-link">
          <Icon size={22} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default MobileNav;
