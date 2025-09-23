import { useEffect, useState } from "react";
import "./CrudCategorias.css"; // importa o CSS

const API_CATEGORIAS = "http://localhost:4000/api/categorias";

export default function CrudCategorias() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({ id: null, nome: "" });

  // Buscar categorias
  useEffect(() => {
    fetch(API_CATEGORIAS)
      .then(res => res.json())
      .then(data => setLista(data))
      .catch(err => console.error(err));
  }, []);

  // Salvar categoria
  const salvar = () => {
    const metodo = form.id ? "PUT" : "POST";
    const url = form.id ? `${API_CATEGORIAS}/${form.id}` : API_CATEGORIAS;

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => {
        setForm({ id: null, nome: "" });
        return fetch(API_CATEGORIAS).then(res => res.json());
      })
      .then(data => setLista(data));
  };

  // Editar
  const editar = (categoria) => {
    setForm(categoria);
  };
// Excluir
const excluir = (id) => {
  if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
    fetch(`${API_CATEGORIAS}/${id}`, { method: "DELETE" })
      .then(() => fetch(API_CATEGORIAS).then(res => res.json()))
      .then(data => setLista(data));
  }
};


  return (
    <div className="crud">
      <h2 className="crud__title">CRUD Categorias</h2>
      <div className="crud__form">
        <input
          type="text"
          className="input"
          value={form.nome}
          placeholder="Nome da categoria"
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <button
          className={`btn ${form.id ? "btn-editar" : "btn-cadastrar"}`}
          onClick={salvar}
        >
          {form.id ? "Atualizar" : "Cadastrar"}
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th className="th">ID</th>
            <th className="th">Nome</th>
            <th className="th">Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((c) => (
            <tr key={c.id}>
              <td className="td">{c.id}</td>
              <td className="td">{c.nome}</td>
              <td className="td row-actions">
                <button
                  className="btn btn-editar btn-small"
                  onClick={() => editar(c)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-excluir btn-small"
                  onClick={() => excluir(c.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
