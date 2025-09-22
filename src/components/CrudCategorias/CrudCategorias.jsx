import { useEffect, useState } from "react";

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
    fetch(`${API_CATEGORIAS}/${id}`, { method: "DELETE" })
      .then(() => fetch(API_CATEGORIAS).then(res => res.json()))
      .then(data => setLista(data));
  };

  return (
    <div>
      <h2>CRUD Categorias</h2>
      <input
        type="text"
        value={form.nome}
        placeholder="Nome da categoria"
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
      />
      <button onClick={salvar}>{form.id ? "Atualizar" : "Cadastrar"}</button>

      <ul>
        {lista.map((c) => (
          <li key={c.id}>
            {c.nome}
            <button onClick={() => editar(c)}>Editar</button>
            <button onClick={() => excluir(c.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
