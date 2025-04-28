import React, { useState } from "react";
import { GlassWater, Wine, Beer, Coffee, Plus } from "lucide-react";

interface ProductFormData {
  name: string;
  supplier: string;
  category: string;
  quantity: number;
  costPrice: number;
  salePrice: number;
}

function App() {
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
          <button className="hero-button">Explorar Catálogo</button>
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
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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
          <option value="vino">Vino</option>
          <option value="cerveza">Cerveza</option>
          <option value="agua">Agua</option>
          <option value="cafe">Café</option>
          <option value="te">Té</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="quantity">Cantidad</label>
        <input
          type="number"
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
          type="number"
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
          type="number"
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

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
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

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
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

export default App;
