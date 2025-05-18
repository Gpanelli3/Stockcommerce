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

const VentasMes = () => {
  const [mesSeleccionado, setMesSeleccionado] = useState("");
  const [ventas, setVentas] = useState(null);

  const meses = [
    { nombre: "Enero", valor: "1" },
    { nombre: "Febrero", valor: "2" },
    { nombre: "Marzo", valor: "3" },
    { nombre: "Abril", valor: "4" },
    { nombre: "Mayo", valor: "5" },
    { nombre: "Junio", valor: "6" },
    { nombre: "Julio", valor: "7" },
    { nombre: "Agosto", valor: "8" },
    { nombre: "Septiembre", valor: "9" },
    { nombre: "Octubre", valor: "10" },
    { nombre: "Noviembre", valor: "11" },
    { nombre: "Diciembre", valor: "12" },
  ];
  const enviarMesAlBackend = (mes) => {
    fetch("http://127.0.0.1:5000/apimain/ventasMes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mes: mes }), // se envía como objeto { mes: "1" }
    })
      .then((res) => res.json())
      .then((data) => {
        setVentas(data);
        console.log("Respuesta del backend:", data);
      })
      .catch((error) =>
        console.error("Error al enviar el mes al backend:", error)
      );
  };

  const handleChange = (e) => {
    const mes = e.target.value;
    setMesSeleccionado(mes);
    if (mes !== "") {
      enviarMesAlBackend(mes);
    }
  };

  return (
    <div>
      <h2>Ingresar mes para conocer tus venta</h2>
      <select value={mesSeleccionado} onChange={handleChange}>
        <option value="">Seleccionar mes</option>
        {meses.map((mes) => (
          <option key={mes.valor} value={mes.valor}>
            {mes.nombre}
          </option>
        ))}
      </select>

      {ventas && (
        <div>
          <h3>Ventas del mes:</h3>
          <pre>{JSON.stringify(ventas, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default VentasMes;
