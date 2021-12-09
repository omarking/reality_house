import React from "react";
import { Link, useHistory } from "react-router-dom";

export const CardProducto = ({codigoProducto, nombreProducto, precio, categoria, tienda}) => {
  
  return (
    <div
      className="card col-10 col-md-3 mx-auto mx-md-2 mb-4"
      style={{ textDecoration: "none", color: "#000" }}>
      <Link
      to="/tienda/producto"
        className="img-card"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/8112950/pexels-photo-8112950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")'}}></Link>
      <div className="card-body">
        <h5 className="card-title">{nombreProducto}</h5>
        <p className="card-text">${precio}</p>
        <p className="text-muted">Categoria: {categoria}</p>
        <div className="row justify-content-around">
            <Link to={`/user/editar/${codigoProducto}`} className="btn btn-warning row-animation"><i className="uil uil-edit-alt"></i> Editar</Link>
            <button className="btn btn-danger row-animation"><i className="uil uil-trash-alt"></i> Eliminar</button>
        </div>
      </div>
    </div>
  );
};
