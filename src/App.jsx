import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login";
import CadastroUsuario from "./pages/CadastroUsuario";
import Alunos from "./pages/Alunos";
import Layout from "./components/Layout/Layout";
import Canais from "./pages/Canais";
import Categorias from "./pages/Categorias";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<CadastroUsuario />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/canais" element={<Canais />} />
          <Route path="/categorias" element={<Categorias />} />
        </Route>
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
}
