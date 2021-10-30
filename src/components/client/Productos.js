import React from "react";
import { Link } from "react-router-dom";
import { CardProductos } from "../general/CardProductos";

export const Productos = () => {
  return (
    <section id="productos">
      <h2 className="text-center mt-5 mb-2">Productos</h2>
      <hr className="w-75 " />
      <div className="row w-75 m-auto justify-content-between">
        <div class="form-group">
          <label>Seleccione Tienda</label>
          <select class="form-control">
            <option>Mueble 1</option>
            <option>Mueble 2</option>
            <option>Mueble 3</option>
            <option>Mueble 4</option>
            <option>Mueble 5</option>
          </select>
        </div>
        <h3>Nombre Tienda</h3>
      </div>
      <div className="row justify-content-center m-auto">
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
      </div>
      <div className="row justify-content-center">
        <Link
          className="btn color-components col-md-2 col-6 row-animation"
          to="/tienda"
        >
          Ver Mas
        </Link>
      </div>
    </section>
  );
};
