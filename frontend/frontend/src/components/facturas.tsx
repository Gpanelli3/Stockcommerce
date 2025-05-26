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

interface Factura {
  nro_factura: number;
  id_cliente: number;
  fecha: string;
  descripcion: string;
  medio_de_pago: string;
  descuento: number;
  total: number;
}

const Facturas = () => {
  const [facturas, setFacturas] = useState<Factura[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/apimain/facturas/")
      .then((res) => res.json())
      .then((data) => setFacturas(data))
      .catch((error) => console.error("Error al cargar facturas:", error));
  }, []);

  return (
    <div className="contenedor">
      <Link to="/" className="back-button">
        Volver al inicio
      </Link>
      <h2 className="titulo">Listado de Facturas</h2>
      {facturas.length === 0 ? (
        <p>No hay facturas disponibles.</p>
      ) : (
        <table className="tabla-facturas">
          <thead>
            <tr>
              <th>Nro. Factura</th>
              <th>ID Cliente</th>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Pago</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura) => (
              <tr key={factura.nro_factura}>
                <td>{factura.nro_factura}</td>
                <td>{factura.id_cliente}</td>
                <td>{new Date(factura.fecha).toLocaleDateString()}</td>
                <td>{factura.descripcion}</td>
                <td>{factura.medio_de_pago}</td>
                <td>${factura.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Facturas;
