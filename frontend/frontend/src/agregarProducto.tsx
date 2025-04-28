import React, { useState } from "react";

interface ProductFormData {
  name: string;
  supplier: string;
  category: string;
  quantity: number;
  costPrice: number;
  salePrice: number;
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
export default ProductForm;
