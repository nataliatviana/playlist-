import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useApolloClient } from "@apollo/client/react";
import { authApi } from "../services/api";
import { clearToken, getToken, setToken } from "../services/token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const client = useApolloClient();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(Boolean(getToken()));

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    client.clearStore();
  }, [client]);

  // Ao abrir a aplicação, valida o token salvo em GET /api/auth/me.
  useEffect(() => {
    if (!getToken()) return;

    authApi
      .me()
      .then((data) => setUser(data.user))
      .catch(() => clearToken())
      .finally(() => setChecking(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const { token } = await authApi.login(email, password);
    setToken(token);
    const { user: me } = await authApi.me();
    setUser(me);
  }, []);

  const register = useCallback(
    async (name, email, password) => {
      await authApi.register(name, email, password);
      await login(email, password);
    },
    [login]
  );

  const value = useMemo(
    () => ({ user, checking, isAuthenticated: Boolean(user), login, register, logout }),
    [user, checking, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
