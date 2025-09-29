import { useEffect, useState } from "react";
import "./CrudCanais.css"; // importa o CSS

const API_CANAIS = "http://localhost:4000/api/canais";
const API_CATEGORIAS = "http://localhost:4000/api/categorias";

export default function CrudCanais() {
  const [lista, setLista] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ id: null, nome: "", numero: "", descricao: "", categoria_id: "" });
  const [erros, setErros] = useState({});

  // Buscar canais e categorias
  useEffect(() => {
    fetch(API_CANAIS).then(res => res.json()).then(setLista);
    fetch(API_CATEGORIAS).then(res => res.json()).then(setCategorias);
  }, []);

  // Validação dos campos
  const validar = () => {
    let novoErro = {};

    if (!form.nome.trim()) {
      novoErro.nome = "O nome do canal é obrigatório.";
    } else if (form.nome.length < 3) {
      novoErro.nome = "O nome deve ter pelo menos 3 caracteres.";
    }

    if (form.numero === "") {
      novoErro.numero = "O número do canal é obrigatório.";
    } else if (isNaN(form.numero) || Number(form.numero) < 0) {
      novoErro.numero = "O número deve ser um valor positivo.";
    }

    // Descrição: só valida se o usuário digitou algo
    if (form.descricao.trim() && form.descricao.length < 5) {
      novoErro.descricao = "A descrição deve ter pelo menos 5 caracteres.";
    }

    if (!form.categoria_id) {
      novoErro.categoria_id = "Selecione uma categoria.";
    }

    setErros(novoErro);
    return Object.keys(novoErro).length === 0;
  };

  // Salvar canal
  const salvar = () => {
    if (!validar()) return;

    const metodo = form.id ? "PUT" : "POST";
    const url = form.id ? `${API_CANAIS}/${form.id}` : API_CANAIS;

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => {
        setForm({ id: null, nome: "", numero: "", descricao: "", categoria_id: "" });
        setErros({});
        return fetch(API_CANAIS).then(res => res.json());
      })
      .then(data => setLista(data));
  };

  // Editar
  const editar = (canal) => {
    setForm(canal);
    setErros({});
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
        {erros.nome && <span className="erro">{erros.nome}</span>}

        <input
          type="number"
          className="input"
          placeholder="Número do canal"
          value={form.numero}
          min="0"
          onChange={(e) => setForm({ ...form, numero: e.target.value })}
        />
        {erros.numero && <span className="erro">{erros.numero}</span>}

        <input
          type="text"
          className="input"
          placeholder="Descrição (opcional)"
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
        />
        {erros.descricao && <span className="erro">{erros.descricao}</span>}

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
        {erros.categoria_id && <span className="erro">{erros.categoria_id}</span>}

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
