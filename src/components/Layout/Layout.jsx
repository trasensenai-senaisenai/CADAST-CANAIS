import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useAuth } from "../../auth/AuthContext";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h1 className="brand">Admin</h1>

        <nav className="nav">
          <NavLink to="/alunos" className={({ isActive }) => `link ${isActive ? "active" : ""}`}>
            Alunos
          </NavLink>
          <NavLink to="/canais" className={({ isActive }) => `link ${isActive ? "active" : ""}`}>
            Canais
          </NavLink>
          <NavLink to="/categorias" className={({ isActive }) => `link ${isActive ? "active" : ""}`}>
            Categorias
          </NavLink>
        </nav>

        {user ? (
          <>
            <span style={{ marginRight: 8 }}>Olá, {user.nome}</span>
            <button className="btn-logout" onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : null}
      </aside>
      

      <main className="content">
        <header className="header">
          <span>Painel Administrativo — Demo de Navegação</span>
        </header>

        <section className="page">
          <Outlet />
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} Sua Empresa
        </footer>
      </main>
    </div>
  );
}
