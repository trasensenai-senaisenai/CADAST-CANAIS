import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "./LoginForm.css";

const API_LOGIN = "http://localhost:4000/api/login";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    const res = await fetch(API_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (!res.ok) {
      setErro("Falha no login.");
      return;
    }

    const data = await res.json(); // { token, usuario }
    login(data);
    navigate("/alunos", { replace: true }); // após login
  }

  return (
    <div className="auth-card">
      <h2 className="auth-title">Login</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <label className="auth-label">
          E-mail
          <input
            className="auth-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="username"
          />
        </label>

        <label className="auth-label">
          Senha
          <input
            className="auth-input"
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </label>

        <button className="auth-button" type="submit">Entrar</button>

        {erro && <p className="auth-error">{erro}</p>}
      </form>

      <p className="auth-footer">
        Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  );
}
