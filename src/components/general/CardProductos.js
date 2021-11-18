import React from "react";
import { Link } from "react-router-dom";

export const CardProductos = ({/* urlImg, */ codigoProducto, nombreProducto, precio, categoria, tienda}) => {
  return (
    <Link
      to={`/${tienda}/${codigoProducto}`}
      className="card col-10 col-md-3 mx-auto mx-md-2 mb-4"
      style={{ textDecoration: "none", color: "#000" }}>
      <div
        className="img-card"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/8112950/pexels-photo-8112950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")'}}></div>
      <div className="card-body">
        <h5 className="card-title">{nombreProducto}</h5>
        <p className="card-text">${precio}</p>
        <p className="text-muted">Categoria: {categoria}</p>
      </div>
    </Link>
  );
};
