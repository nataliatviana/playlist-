import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicOnlyRoute } from "./components/PrivateRoute";
import AppLayout from "./layouts/AppLayout";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PlaylistDetail from "./pages/PlaylistDetail";
import Register from "./pages/Register";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/buscar" element={<Search />} />
            <Route path="/favoritas" element={<Favorites />} />
            <Route path="/playlist/:id" element={<PlaylistDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
