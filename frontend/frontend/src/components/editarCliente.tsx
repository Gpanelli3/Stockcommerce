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
} from "lucide-react";

interface ClientFormData {
  name: string;
  dni: string;
  phone: string;
}
interface Client {
  id: number;
  nombre: string;
  dni: string;
  phone: string;
}

function EditClient() {
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    dni: "",
    phone: "",
  });
  const [clients, setClients] = useState<Client[]>([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/apimain/usuarios")
      .then((res) => res.json())
      .then((data) => {
        console.log("Clientes desde backend:", data);
        setClients(data);
      })
      .catch((error) => console.log("Error al cargar clientes:", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const EditarCliente = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        nombre: formData.name,
        dni: formData.dni,
        telefono: formData.phone,
      };
      alert("cliente editado correctamente");

      const res = await fetch("http://127.0.0.1:5000/apimain/editarCliente/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error al editar el producto");
      setFormData({
        name: "",
        dni: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };
  return (
    <div className="client-registration">
      <div className="registration-container">
        <Link to="/" className="back-button">
          Volver al inicio
        </Link>
        <br />
        <Link to="/register-client" className="back-button">
          <UserPlus size={20} />
          Volver a Clientes
        </Link>
        <br />
        <Link to="/eliminarCliente" className="back-button">
          Eliminar Cliente
        </Link>
        <h2 className="registration-title">Editar Cliente</h2>
        <form className="registration-form" onSubmit={EditarCliente}>
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dni">DNI</label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button">
            Guardar Cliente
          </button>
        </form>
      </div>
    </div>
  );
}
export default EditClient;
