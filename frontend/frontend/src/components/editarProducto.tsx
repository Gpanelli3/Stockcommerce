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
    id: "",
    name: "",
    price: "",
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
        `http://localhost:3000/api/products/${productData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: productData.name,
            price: productData.price,
          }),
        }
      );

      if (!res.ok) throw new Error("Error al editar el producto");

      const result = await res.json();
      console.log("Producto editado:", result);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <form onSubmit={EditProduct}>
      <input
        name="id"
        type="text"
        placeholder="ID del producto"
        value={productData.id}
        onChange={handleChange}
        required
      />
      <input
        name="name"
        type="text"
        placeholder="Nombre del producto"
        value={productData.name}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Precio"
        value={productData.price}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default EditarProduct;
