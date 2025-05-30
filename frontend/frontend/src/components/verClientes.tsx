import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  GlassWater,
  Wine,
  Beer,
  Coffee,
  Plus,
  UserPlus,
  ShoppingCart,
  Import,
} from "lucide-react";

type Cliente = {
  id: number;
  nombre: string;
  dni: number;
  telefono: string;
};

const ClienteList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/apimain/verClientes/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los clientes");
        }
        return res.json();
      })
      .then((data) => {
        setClientes(data);
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <Link to="/" className="back-button">
        Volver al inicio
      </Link>
      <br />
      <Link to="/register-client" className="back-button">
        <UserPlus size={20} />
        Volver a Clientes
      </Link>
      <br />
      <Link to="/editarCliente" className="back-button">
        Editar Cliente
      </Link>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.dni}</td>
              <td>{cliente.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteList;
