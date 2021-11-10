import React from "react";

export const RegistroUsuario = () => {
  return (
    <div>
    <div className="row border rounded w-75 h-75 mx-auto mt-5">
      <form
        className="col-10 col-md-6 m-auto"
        style={{ overflowY: "scroll", overflowX: "hidden", height: "500px" }}
      >
        <h3 className="mt-2">Registro de Usuario</h3>

        <div className="form-group mt-5">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Alexander"
            className="form-control col-6"
          />
        </div>

        <div className="form-group mt-5">
          <label>Primer Apellido:</label>
          <input
            type="text"
            placeholder="Alexander"
            className="form-control col-6"
          />
        </div>

        <div className="form-group mt-5">
          <label>Segundo Apellido:</label>
          <input
            type="text"
            placeholder="Alexander"
            className="form-control col-6"
          />
        </div>

        <div className="form-group mt-5">
          <label>Nombre Tienda:</label>
          <input
            type="text"
            placeholder="Alexander"
            className="form-control col-6"
          />
        </div>

        <div className="form-group mt-5">
          <label>Correo Electronico:</label>
          <input
            type="email"
            placeholder="email@email.com"
            className="form-control col-6"
          />
        </div>

        <div className="form-group mt-5">
          <label>Telefono:</label>
          <input
            type="number"
            placeholder="5500000000"
            className="form-control col-6"
          />
        </div>
        <div className="form-group mt-5">
          <label>Contrasena:</label>
          <input
            type="text"
            placeholder="Alexander"
            className="form-control col-6"
          />
        </div>

        <input
          type="submit"
          value="Registrar"
          className="btn color-components col-3 mr-2"
        />
        <button className="btn color-components col-3">Cancelar</button>
      </form>
      <div className="img col-6 img-login border d-none d-md-block"></div>
    </div>
  </div>
  );};