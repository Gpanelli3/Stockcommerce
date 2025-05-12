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

const EditarProduct = () => {
  const [productData, setProductData] = useState({
    producto: "",
    cantidad: "",
    precio_costo: "",
    precio_venta: "",
  });

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const EditProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/apimain/editarProductos/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
          credentials: "include",
        }
      );
      console.log(productData);

      if (!res.ok) throw new Error("Error al editar el producto");

      setProductData({
        producto: "",
        cantidad: "",
        precio_costo: "",
        precio_venta: "",
      });

      const result = await res.json();
      console.log("Producto editado:", result);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <form onSubmit={EditProduct}>
      <input
        name="producto"
        type="number"
        placeholder="ID del producto"
        value={productData.producto}
        onChange={handleChange}
        required
      />
      <input
        name="cantidad"
        type="number"
        placeholder="cantidad nueva"
        value={productData.cantidad}
        onChange={handleChange}
        required
      />
      <input
        name="precio_costo"
        type="number"
        placeholder="precio costo"
        value={productData.precio_costo}
        onChange={handleChange}
        required
      />
      <input
        name="precio_venta"
        type="number"
        placeholder="precio venta"
        value={productData.precio_venta}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default EditarProduct;
