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

interface Product {
  id: number;
  name: string;
}

const BorrarProducto = () => {
  const [productData, setProductData] = useState({
    producto: "",
  });
  // interfaz para traer los productos

  // fetch para traer los productos
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/apimain/productosParaEditar/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log("error al cargar los productos", error));
  }, []);
  // console.log("los productos:", products);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const DeletProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const productFound = products.find(
        (p) =>
          p.name.trim().localeCompare(productData.producto.trim(), undefined, {
            sensitivity: "base",
          }) === 0
      );

      if (!productFound) {
        alert("Producto no encontrado");
        return;
      }

      const payload = {
        producto: productFound.id,
      };
      alert("producto borrado correctamente");

      const res = await fetch(
        "http://127.0.0.1:5000/apimain/borrarProductos/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Error al editar el producto");

      setProductData({
        producto: "",
      });
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };
  return (
    <form onSubmit={DeletProduct} className="edit-form">
      <Link to="/" className="back-button">
        Volver al inicio
      </Link>
      <h2>BORRAR PRODUCTOS</h2>
      <input
        name="producto"
        type="text"
        placeholder="Nombre del producto"
        value={productData.producto}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default BorrarProducto;
