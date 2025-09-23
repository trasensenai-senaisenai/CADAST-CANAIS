import { useEffect, useState } from "react";
import "./CrudCanais.css"; // importa o CSS

const API_CANAIS = "http://localhost:4000/api/canais";
const API_CATEGORIAS = "http://localhost:4000/api/categorias";

export default function CrudCanais() {
  const [lista, setLista] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ id: null, nome: "", numero: "", descricao: "", categoria_id: "" });

  // Buscar canais e categorias
  useEffect(() => {
    fetch(API_CANAIS).then(res => res.json()).then(setLista);
    fetch(API_CATEGORIAS).then(res => res.json()).then(setCategorias);
  }, []);

  // Salvar canal
  const salvar = () => {
    const metodo = form.id ? "PUT" : "POST";
    const url = form.id ? `${API_CANAIS}/${form.id}` : API_CANAIS;

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => {
        setForm({ id: null, nome: "", numero: "", descricao: "", categoria_id: "" });
        return fetch(API_CANAIS).then(res => res.json());
      })
      .then(data => setLista(data));
  };

  // Editar
  const editar = (canal) => {
    setForm(canal);
  };

// Excluir
const excluir = (id) => {
  if (window.confirm("Tem certeza que deseja excluir este canal?")) {
    fetch(`${API_CANAIS}/${id}`, { method: "DELETE" })
      .then(() => fetch(API_CANAIS).then(res => res.json()))
      .then(data => setLista(data));
  }
};


  return (
    <div className="crud">
      <h2 className="crud__title">CRUD Canais</h2>

      <div className="crud__form">
        <input
          type="text"
          className="input"
          placeholder="Nome do canal"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <input
  type="number"
  className="input"
  placeholder="Número do canal"
  value={form.numero}
  min="0" // evita números negativos no input
  onChange={(e) => {
    const value = e.target.value;
    if (value >= 0) {
      setForm({ ...form, numero: value });
    }
  }}
/>

        <input
          type="text"
          className="input"
          placeholder="Descrição"
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
        />
        <select
          className="select select-categoria"
          value={form.categoria_id}
          onChange={(e) => setForm({ ...form, categoria_id: e.target.value })}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </select>

        <button
          className={`btn ${form.id ? "btn-editar" : "btn-cadastrar"}`}
          onClick={salvar}
        >
          {form.id ? "Atualizar" : "Cadastrar"}
        </button>
      </div>

      {/* Tabela de listagem */}
      <table className="table">
        <thead>
          <tr>
            <th className="th">ID</th>
            <th className="th">Número</th>
            <th className="th">Nome</th>
            <th className="th">Categoria</th>
            <th className="th">Descrição</th>
            <th className="th">Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((c) => (
            <tr key={c.id}>
              <td className="td">{c.id}</td>
              <td className="td">{c.numero}</td>
              <td className="td">{c.nome}</td>
              <td className="td">{c.categoria}</td>
              <td className="td">{c.descricao}</td>
              <td className="td row-actions">
                <button className="btn btn-editar btn-small" onClick={() => editar(c)}>Editar</button>
                <button className="btn btn-excluir btn-small" onClick={() => excluir(c.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
