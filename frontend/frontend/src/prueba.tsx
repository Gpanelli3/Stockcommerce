import React, { useState } from "react";

export default function SimpleForm() {
  const [formData, setFormData] = useState({
    name: "",
    supplier: "",
    category: "",
    quantity: "",
    costPrice: "",
    salePrice: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/apimain/ingresoProductos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Error al enviar");

      alert("Enviado correctamente");
    } catch (error) {
      alert("Error al enviar");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" onChange={handleChange} />
      <input name="supplier" placeholder="Proveedor" onChange={handleChange} />
      <input name="category" placeholder="Categoría" onChange={handleChange} />
      <input name="quantity" placeholder="Cantidad" onChange={handleChange} />
      <input
        name="costPrice"
        placeholder="Precio Costo"
        onChange={handleChange}
      />
      <input
        name="salePrice"
        placeholder="Precio Venta"
        onChange={handleChange}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
