import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorMessage from "../components/ErrorMessage";
import Logo from "../components/Logo";
import { errorMessage } from "../utils/format";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // Mesmas regras do validateRegister do backend.
    if (form.password.length < 6) {
      setError("A senha deve possuir pelo menos 6 caracteres.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      await register(form.name.trim(), form.email.trim(), form.password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <Logo size="lg" />
          <p>Crie sua conta e monte suas playlists.</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <ErrorMessage message={error} />

          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              value={form.name}
              onChange={update("name")}
              placeholder="Seu nome"
              autoComplete="name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="voce@email.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={update("password")}
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm">Confirmar senha</label>
              <input
                id="confirm"
                type="password"
                value={form.confirm}
                onChange={update("confirm")}
                placeholder="Repita a senha"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <button type="submit" className="button primary block" disabled={loading}>
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="auth-footer">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
