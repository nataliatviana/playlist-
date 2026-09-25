import { getToken } from "./token";

// Cliente RESTful: usado para autenticação (/api/auth) e para a
// pesquisa de músicas com filtros (/api/songs?search=&genre=).
const API_URL = import.meta.env.VITE_API_URL;

async function request(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Não foi possível conectar ao servidor.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.errors?.join(" ") || data.message || "Erro inesperado.";
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}

export const authApi = {
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: { email, password } }),
  register: (name, email, password) =>
    request("/auth/register", { method: "POST", body: { name, email, password } }),
  me: () => request("/auth/me"),
};

export const catalogApi = {
  searchSongs: ({ search, genre } = {}) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (genre) params.set("genre", genre);
    const query = params.toString();
    return request(`/songs${query ? `?${query}` : ""}`);
  },
  genres: () => request("/genres"),
};
