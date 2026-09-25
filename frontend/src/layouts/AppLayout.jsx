import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PlayerProvider } from "../context/PlayerContext";
import MobileNav from "../components/MobileNav";
import PlayerBar from "../components/PlayerBar";
import PlaylistForm from "../components/PlaylistForm";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);

  return (
    <PlayerProvider>
      <div className="app-shell">
        <Sidebar onNewPlaylist={() => setCreating(true)} />
        <main className="content">
          <Outlet context={{ openNewPlaylist: () => setCreating(true) }} />
        </main>
        <PlayerBar />
        <MobileNav />
      </div>

      {creating && (
        <PlaylistForm
          onClose={() => setCreating(false)}
          onSaved={(id) => navigate(`/playlist/${id}`)}
        />
      )}
    </PlayerProvider>
  );
}

export default AppLayout;
