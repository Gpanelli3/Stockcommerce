// import React from "react";

// function FacturaGenerada({ factura }) {
//   if (!factura) return null;

//   return (
//     <div
//       style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}
//     >
//       <h2>Factura #{factura.id}</h2>
//       <p>Fecha: {factura.fecha}</p>

//       <table
//         style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}
//       >
//         <thead>
//           <tr>
//             <th style={thStyle}>Producto</th>
//             <th style={thStyle}>Cantidad</th>
//             <th style={thStyle}>Precio Unitario</th>
//             <th style={thStyle}>Subtotal</th>
//           </tr>
//         </thead>
//         <tbody>
//           {factura.detalles.map((item, i) => (
//             <tr key={i}>
//               <td style={tdStyle}>{item.producto}</td>
//               <td style={tdStyle}>{item.cantidad}</td>
//               <td style={tdStyle}>${item.precio_unitario.toFixed(2)}</td>
//               <td style={tdStyle}>${item.subtotal.toFixed(2)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h3 style={{ textAlign: "right", marginTop: "1rem" }}>
//         Total: ${factura.total.toFixed(2)}
//       </h3>

//       <button onClick={() => window.print()} style={{ marginTop: "1rem" }}>
//         Imprimir
//       </button>
//     </div>
//   );
// }

// const thStyle = {
//   borderBottom: "1px solid #ccc",
//   textAlign: "left",
//   padding: "8px",
// };
// const tdStyle = { borderBottom: "1px solid #eee", padding: "8px" };

// export default FacturaGenerada;
