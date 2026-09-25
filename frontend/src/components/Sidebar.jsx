import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_MINHAS_PLAYLISTS } from "../graphql/queries";
import { useAuth } from "../context/AuthContext";
import Cover from "./Cover";
import { LogoutIcon, PlusIcon } from "./Icons";
import Logo from "./Logo";
import { NAV_ITEMS } from "./navItems";

function Sidebar({ onNewPlaylist }) {
  const { user, logout } = useAuth();
  const { data } = useQuery(GET_MINHAS_PLAYLISTS);
  const playlists = data?.minhasPlaylists || [];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Logo />
      </div>

      <nav className="sidebar-nav" aria-label="Principal">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className="nav-link">
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-divider" />

      <div className="library-header">
        <span>Biblioteca</span>
        <button
          type="button"
          className="icon-button"
          onClick={onNewPlaylist}
          aria-label="Nova playlist"
          title="Nova playlist"
        >
          <PlusIcon size={18} />
        </button>
      </div>

      <nav className="library" aria-label="Suas playlists">
        {playlists.length === 0 && <p className="library-empty">Nenhuma playlist ainda.</p>}
        {playlists.map((playlist) => (
          <NavLink key={playlist.id} to={`/playlist/${playlist.id}`} className="library-item">
            <Cover seed={playlist.name} size="sm" />
            <span className="library-name">{playlist.name}</span>
          </NavLink>
        ))}
      </nav>

      {user && (
        <div className="user-card">
          <div className="avatar" aria-hidden="true">
            {user.name?.[0]?.toUpperCase()}
          </div>
          <div className="user-info">
            <strong>{user.name}</strong>
            <span className="user-email">{user.email}</span>
          </div>
          <button type="button" className="icon-button" onClick={logout} aria-label="Sair" title="Sair">
            <LogoutIcon size={18} />
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
