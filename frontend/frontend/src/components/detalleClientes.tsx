import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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

interface Detalle {
  nroDetalle: number;
  factura: number;
  producto: number;
  cantidad: number;
  subtotal: number;
}

const DetalleFacturas = () => {
  const [detalles, setDetalles] = useState<Detalle[]>([]);
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/apimain/detalle/")
      .then((res) => res.json())
      .then((data) => setDetalles(data))
      .catch((err) => console.error("Error al cargar detalles:", err));
  }, []);

  const exportarPDF = () => {
    if (!pdfRef.current) return;

    html2canvas(pdfRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Encabezado
      const fechaHoy = new Date().toLocaleDateString();
      pdf.setFontSize(18);
      pdf.text("STOCK CONTROL", pdf.internal.pageSize.getWidth() / 2, 15, {
        align: "center",
      });
      pdf.setFontSize(12);
      pdf.text(`Fecha: ${fechaHoy}`, pdf.internal.pageSize.getWidth() - 50, 22);

      // Imagen de la tabla (debajo del encabezado)
      pdf.addImage(imgData, "PNG", 0, 30, pdfWidth, pdfHeight);
      pdf.save("detalle_facturas.pdf");
    });
  };

  return (
    <div className="contenedor">
      <Link to="/" className="back-button">
        Volver al inicio
      </Link>
      <h2 className="titulo">Detalle de Facturas</h2>
      <button onClick={exportarPDF} className="exportar-pdf-button">
        Exportar a PDF
      </button>

      <div ref={pdfRef}>
        {detalles.length === 0 ? (
          <p>No hay detalles disponibles.</p>
        ) : (
          <table className="tabla-detalle">
            <thead>
              <tr>
                <th>Nro Detalle</th>
                <th>Nro Factura</th>
                <th>ID Producto</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((d) => (
                <tr key={d.nroDetalle}>
                  <td>{d.nroDetalle}</td>
                  <td>{d.factura}</td>
                  <td>{d.producto}</td>
                  <td>{d.cantidad}</td>
                  <td>${d.subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DetalleFacturas;
