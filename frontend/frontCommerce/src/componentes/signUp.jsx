import React, { useState } from "react";
import "../App.css";

function SignUp() {
  const [state, setState] = useState({
    nombre: "",
    dni: "",
    telefono: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value, // Actualiza solo el campo que cambió
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    const data = {
      email: state.email,
      password: state.password,
      telefono: state.telefono,
    };
    console.log(data);

    fetch("127.0.0.1/usertest/signUp", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error("error", error))
      .then((response) => console.log("exitoso", response));
  };

  return (
    <>
      <form onSubmit={submit} className="formulario">
        <h2>Registro de clientes</h2>
        <label htmlFor="email">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={state.nombre} // Usar state en lugar de values
          onChange={inputChange}
        />
        <label htmlFor="dni">Dni</label>
        <input
          id="dni"
          name="dni"
          type="number"
          value={state.dni} // Usar state en lugar de values
          onChange={inputChange}
        />
        <label htmlFor="telefono">telefono</label>
        <input
          id="telefono"
          name="telefono"
          type="number"
          value={state.telefono} // Usar state en lugar de values
          onChange={inputChange}
        />
        <button type="submit">Registrarse</button>
      </form>
    </>
  );
}

export default SignUp;
