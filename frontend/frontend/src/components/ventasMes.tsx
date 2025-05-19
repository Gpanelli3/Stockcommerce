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

interface MasVendido {
  cantidad_vendida: number;
  id_producto: number;
  nombre_producto: string;
}

const VentasMes = () => {
  const [mesSeleccionado, setMesSeleccionado] = useState("");
  const [ventas, setVentas] = useState<any>(null);
  const [masVendidos, setMasVendidos] = useState<MasVendido | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/apimain/masVendido/")
      .then((res) => res.json())
      .then((datos) => setMasVendidos(datos))
      .catch((error) => console.log("error al cargar los productos", error));
  }, []);

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
    <div className="contenedor">
      <Link to="/" className="back-button">
        Volver al inicio
      </Link>
      <h2 className="titulo">Ingresar mes para conocer tus ventas</h2>
      <select
        value={mesSeleccionado}
        onChange={handleChange}
        className="select-mes"
      >
        <option value="">Seleccionar mes</option>
        {meses.map((mes) => (
          <option key={mes.valor} value={mes.valor}>
            {mes.nombre}
          </option>
        ))}
      </select>
      {ventas && (
        <div className="ventas-contenedor">
          <h3 className="subtitulo">Ventas del mes:</h3>
          <pre className="ventas-json">{JSON.stringify(ventas, null, 2)}</pre>
        </div>
      )}

      {masVendidos && (
        <div className="ventas-contenedor">
          <h3 className="subtitulo">Producto más vendido:</h3>
          <p>Producto: {masVendidos.nombre_producto}</p>
          <p>
            ventas procesadas de dicho producto: {masVendidos.cantidad_vendida}
          </p>
          <p>ID producto: {masVendidos.id_producto}</p>
        </div>
      )}
    </div>
  );
};
export default VentasMes;
