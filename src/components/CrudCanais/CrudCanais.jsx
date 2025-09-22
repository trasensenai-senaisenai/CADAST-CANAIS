import { useEffect, useState } from "react";

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
    fetch(`${API_CANAIS}/${id}`, { method: "DELETE" })
      .then(() => fetch(API_CANAIS).then(res => res.json()))
      .then(data => setLista(data));
  };

  return (
    <div>
      <h2>CRUD Canais</h2>
      <input
        type="text"
        placeholder="Nome do canal"
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
      />
      <input
        type="number"
        placeholder="Número do canal"
        value={form.numero}
        onChange={(e) => setForm({ ...form, numero: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={form.descricao}
        onChange={(e) => setForm({ ...form, descricao: e.target.value })}
      />
      <select
        value={form.categoria_id}
        onChange={(e) => setForm({ ...form, categoria_id: e.target.value })}
      >
        <option value="">Selecione uma categoria</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.nome}</option>
        ))}
      </select>
      <button onClick={salvar}>{form.id ? "Atualizar" : "Cadastrar"}</button>

      <ul>
        {lista.map((c) => (
          <li key={c.id}>
            Canal {c.numero} - {c.nome} ({c.categoria_nome})
            <button onClick={() => editar(c)}>Editar</button>
            <button onClick={() => excluir(c.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
