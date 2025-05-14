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
  costPrice: number;
  salePrice: number;
  quantity: number;
}

const EditarProduct = () => {
  const [productData, setProductData] = useState({
    producto: "",
    cantidad: "",
    precio_costo: "",
    precio_venta: "",
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

  const EditProduct = async (e: React.FormEvent<HTMLFormElement>) => {
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
        cantidad: Number(productData.cantidad),
        precio_costo: Number(productData.precio_costo),
        precio_venta: Number(productData.precio_venta),
      };
      alert("producto editado correctamente");

      const res = await fetch(
        "http://127.0.0.1:5000/apimain/editarProductos/",
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
        cantidad: "",
        precio_costo: "",
        precio_venta: "",
      });
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };
  return (
    <form onSubmit={EditProduct} className="edit-form">
      <Link to="/" className="back-button">
        Volver al inicio
      </Link>
      <input
        name="producto"
        type="text"
        placeholder="Nombre del producto"
        value={productData.producto}
        onChange={handleChange}
        required
      />

      <input
        name="cantidad"
        type="number"
        placeholder="Cantidad nueva"
        value={productData.cantidad}
        onChange={handleChange}
        required
      />

      <input
        name="precio_costo"
        type="number"
        placeholder="Precio costo"
        value={productData.precio_costo}
        onChange={handleChange}
        required
      />

      <input
        name="precio_venta"
        type="number"
        placeholder="Precio venta"
        value={productData.precio_venta}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default EditarProduct;
