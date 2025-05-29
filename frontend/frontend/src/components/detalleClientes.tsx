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
  precio: number;
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

      const fechaHoy = new Date().toLocaleDateString();
      pdf.setFontSize(18);
      pdf.text(
        "STOCK CONTROL - FACTURA",
        pdf.internal.pageSize.getWidth() / 2,
        15,
        {
          align: "center",
        }
      );
      pdf.setFontSize(12);
      pdf.text(`Fecha: ${fechaHoy}`, pdf.internal.pageSize.getWidth() - 50, 22);

      // Tabla + info empresa como imagen
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

      <div ref={pdfRef} style={{ marginTop: "20px", padding: "10px" }}>
        {/* Datos de la empresa */}
        <div className="empresa-info" style={{ marginBottom: "30px" }}>
          <p>
            <strong>Empresa:</strong> Stock Control
          </p>
          <p>
            <strong>Dirección:</strong> Sarmiento 225, San Rafael
          </p>
          <p>
            <strong>Tel:</strong> +54 9 260 4000000
          </p>
        </div>

        {/* Tabla */}
        {detalles.length === 0 ? (
          <p>No hay detalles disponibles.</p>
        ) : (
          <table
            className="tabla-detalle"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Nro Detalle</th>
                <th style={thStyle}>Nro Factura</th>
                <th style={thStyle}>Producto</th>
                <th style={thStyle}>Precio unitario</th>
                <th style={thStyle}>Cantidad</th>
                <th style={thStyle}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((d) => (
                <tr key={d.nroDetalle}>
                  <td style={tdStyle}>{d.nroDetalle}</td>
                  <td style={tdStyle}>{d.factura}</td>
                  <td style={tdStyle}>{d.producto}</td>
                  <td style={tdStyle}>{d.precio}</td>
                  <td style={tdStyle}>{d.cantidad}</td>
                  <td style={tdStyle}>${d.subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Estilos simples para tabla
const thStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "8px",
  backgroundColor: "#f0f0f0",
  textAlign: "left",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "8px",
};

export default DetalleFacturas;
