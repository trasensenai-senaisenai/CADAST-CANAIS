import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CadastroUsuarioForm.css";

const API_CADASTRO = "http://localhost:4000/api/usuarios";

export default function CadastroUsuarioForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(API_CADASTRO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    navigate("/", { replace: true }); // volta pro login
  }

  return (
    <div className="auth-card">
      <h2 className="auth-title">Cadastrar Usuário</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <label className="auth-label">
          Nome
          <input
            className="auth-input"
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
          />
        </label>

        <label className="auth-label">
          E-mail
          <input
            className="auth-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
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
          />
        </label>

        <button className="auth-button" type="submit">Cadastrar</button>
      </form>

      <p className="auth-footer">
        Já tem conta? <Link to="/">Entrar</Link>
      </p>
    </div>
  );
}
