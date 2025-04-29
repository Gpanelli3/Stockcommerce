import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { GlassWater, Wine, Beer, Coffee, Plus, UserPlus } from "lucide-react";

interface ProductFormData {
  name: string;
  supplier: string;
  category: string;
  quantity: number;
  costPrice: number;
  salePrice: number;
}
// New interface for client data
interface ClientFormData {
  name: string;
  dni: string;
  phone: string;
}

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
interface ProductCardProps {
  image: string;
  name: string;
  price: string;
}

function HomePage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-background">
          <img
            src="https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg"
            alt="Background"
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">Descubre el Arte de la Bebida</h1>
          <p className="hero-description">
            Explora nuestra selecta colección de bebidas premium, desde
            refrescantes aguas minerales hasta los más finos vinos y cervezas
            artesanales.
          </p>
          <div className="hero-buttons">
            <button className="hero-button">Explorar Catálogo</button>
            <Link to="/register-client" className="hero-button register-client">
              <UserPlus size={20} />
              Registrar Cliente
            </Link>
          </div>
        </div>
      </div>

      {/* Product Management Section */}
      <div className="product-management">
        <div className="management-header">
          <h2 className="section-title">Gestión de Productos</h2>
          <button
            className="add-product-button"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus size={20} />
            {showForm ? "Cerrar Formulario" : "Agregar Producto"}
          </button>
        </div>

        {showForm && <ProductForm />}
      </div>

      {/* Categories Section */}
      <div className="categories">
        <h2 className="section-title">Nuestras Categorías</h2>
        <div className="categories-grid">
          <CategoryCard
            icon={<GlassWater size={32} />}
            title="Aguas Premium"
            description="Aguas minerales y saborizadas de la más alta calidad"
          />
          <CategoryCard
            icon={<Wine size={32} />}
            title="Vinos Selectos"
            description="Colección exclusiva de vinos nacionales e importados"
          />
          <CategoryCard
            icon={<Beer size={32} />}
            title="Cervezas Artesanales"
            description="Las mejores cervezas artesanales del mundo"
          />
          <CategoryCard
            icon={<Coffee size={32} />}
            title="Bebidas Calientes"
            description="Café, té y chocolate de origen premium"
          />
        </div>
      </div>

      {/* Featured Products Preview */}
      <div className="featured">
        <div className="featured-content">
          <h2 className="section-title">Productos Destacados</h2>
          <div className="products-grid">
            <ProductCard
              image="https://images.pexels.com/photos/1407857/pexels-photo-1407857.jpeg"
              name="Vino Reserva 2018"
              price="$45.99"
            />
            <ProductCard
              image="https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg"
              name="Cerveza Artesanal IPA"
              price="$8.99"
            />
            <ProductCard
              image="https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg"
              name="Café Orgánico Premium"
              price="$24.99"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Client Registration Page
function ClientRegistration() {
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    dni: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would add your endpoint URL
      const response = await fetch(
        "http://127.0.0.1:5000/apimain/registroCliente",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al registrar el cliente");
      }

      // Reset form after successful submission
      setFormData({
        name: "",
        dni: "",
        phone: "",
      });

      alert("Cliente registrado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al registrar el cliente");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="client-registration">
      <div className="registration-container">
        <Link to="/" className="back-button">
          Volver al inicio
        </Link>
        <h2 className="registration-title">Registro de Cliente Nuevo</h2>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dni">DNI</label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Registrar Cliente
          </button>
        </form>
      </div>
    </div>
  );
}

function ProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    supplier: "",
    category: "",
    quantity: 0,
    costPrice: 0,
    salePrice: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would add your endpoint URL
      const response = await fetch(
        "http://127.0.0.1:5000/apimain/ingresoProductos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Error al guardar el producto");
      }

      // Reset form after successful submission
      setFormData({
        name: "",
        supplier: "",
        category: "",
        quantity: 0,
        costPrice: 0,
        salePrice: 0,
      });

      alert("Producto agregado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar el producto");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "costPrice" || name === "salePrice"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nombre del Producto</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="supplier">Proveedor</label>
        <input
          type="text"
          id="supplier"
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Categoría</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar categoría</option>
          <option value="1">Alchool +50%</option>
          <option value="2">Gaseosa</option>
          <option value="3">Bebidas energizantes</option>
          <option value="4">Cerveza</option>
          <option value="5">Jugos</option>
          <option value="6">Cigarrillos</option>
          <option value="7">Papas fritas</option>
          <option value="8">Golosinas</option>
          <option value="9">Aguas</option>
          <option value="10">Vinos</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="quantity">Cantidad</label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="costPrice">Precio Costo</label>
        <input
          type="text"
          id="costPrice"
          name="costPrice"
          value={formData.costPrice}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="salePrice">Precio Venta</label>
        <input
          type="text"
          id="salePrice"
          name="salePrice"
          value={formData.salePrice}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Guardar Producto
      </button>
    </form>
  );
}

function CategoryCard({ icon, title, description }: CategoryCardProps) {
  return (
    <div className="category-card">
      <div className="category-icon">{icon}</div>
      <h3 className="category-title">{title}</h3>
      <p className="category-description">{description}</p>
    </div>
  );
}

function ProductCard({ image, name, price }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">{price}</p>
      </div>
    </div>
  );
}

// Main App component with routing
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register-client" element={<ClientRegistration />} />
    </Routes>
  );
}

export default App;
