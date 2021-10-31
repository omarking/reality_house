import React from "react";
import { Link } from "react-router-dom";

export const CardProducto = () => {
  return (
    <Link
      to="/tienda/producto"
      className="card col-10 col-md-3 mx-auto mx-md-2 mb-4"
      style={{ textDecoration: "none", color: "#000" }}>
      <div
        className="img-card"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/8112950/pexels-photo-8112950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")'}}></div>
      <div className="card-body">
        <h5 className="card-title">Nombre Producto</h5>
        <p className="card-text">$12345</p>
        <p className="text-muted">Categoria: Categoria</p>
        <div className="row justify-content-around">
            <button className="btn btn-warning row-animation"><i className="uil uil-edit-alt"></i> Editar</button>
            <button className="btn btn-danger row-animation"><i className="uil uil-trash-alt"></i> Eliminar</button>
        </div>
      </div>
    </Link>
  );
};
