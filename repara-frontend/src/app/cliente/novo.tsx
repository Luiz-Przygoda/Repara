import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function NovoCliente() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const router = useRouter();

  const salvar = async () => {
    await axios.post('http://localhost:3000/clientes', { nome, telefone });
    router.push('/clientes');
  };

  return (
    <div>
      <h1>Novo Cliente</h1>
      <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      <button onClick={salvar}>Salvar</button>
    </div>
  );
}
