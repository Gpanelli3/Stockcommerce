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
interface ProductFormData {
  name: string;
  supplier: string;
  category: string;
  quantity: number;
  costPrice: number;
  salePrice: number;
}

function CatalogPage() {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [search, setSearch] = useState("");

  // Función para cargar todos los productos
  const fetchAllProducts = () => {
    fetch("http://127.0.0.1:5000/apimain/catalogoProductos")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log("error al cargar los productos", error));
  };

  // Función para buscar productos por nombre
  const fetchSearchedProducts = (query: string) => {
    fetch(
      `http://127.0.0.1:5000/apimain/buscador/?producto=${encodeURIComponent(
        query
      )}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.log("error en la búsqueda de productos", error)
      );
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Maneja cambios en el input del buscador
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      fetchAllProducts();
    } else {
      fetchSearchedProducts(value);
    }
  };

  return (
    <div className="catalog-page">
      <div className="catalog-container">
        <Link to="/" className="back-button">
          Volver al inicio
        </Link>
        <h2 className="catalog-title">Catálogo de Productos</h2>

        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={handleSearchChange}
          style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        />

        <div className="catalog-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio Costo</th>
                <th>Precio Venta</th>
                <th>Proveedor</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>${product.costPrice}</td>
                  <td>${product.salePrice}</td>
                  <td>{product.supplier}</td>
                  <td>{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
