"use client";

import { useEffect, useState } from 'react';
import { api } from "../services/api";

export default function ClientesPage() {
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    api.get("/cliente")
      .then(res => {
        console.log(res.data); 
        setClientes(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clientes.map(c => (
          <li key={c.id}>{c.nome}</li>
        ))}
      </ul>
    </div>
  );
}
