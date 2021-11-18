import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCallGET } from "../../hooks/useCallGET";

import { CardProductos } from "../general/CardProductos";

export const Productos = () => {
  const [tienda, setTienda] = useState("");
  const [productos, setProductos] = useState([]);
  const urlTienda = "http://localhost/realityhouse/api/productos.php?p=tiendas";
  const { data, loading } = useCallGET(urlTienda);
  const shop = !!data && data;

  const callProducts = (event) => {
    setTienda(event.target.value);

    axios
      .get(
        `http://localhost/realityhouse/api/productos.php?p=productos&t=${event.target.value}`
      )
      .then((res) => {
        const data = res.data;
        setProductos(data);
      });
  };

  if (loading) {
    return (
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
      <section id="productos">
        <h2 className="text-center mt-5 mb-2">Productos</h2>
        <hr className="w-75 " />
        <div className="row w-75 m-auto justify-content-between">
          <div className="form-group">
            <label>Seleccione Tienda</label>

            <select onChange={callProducts} className="form-control">
              <option>Seleccione</option>
              {shop.map((x, i) => {
                return (
                  <option key={i} value={x.nombreTienda}>
                    {x.nombreTienda}
                  </option>
                );
              })}
            </select>
          </div>
          {tienda === "" ? <h3>Seleccione tienda</h3> : <h3>{tienda}</h3>}
        </div>
        <div className="row justify-content-center m-auto">
          {productos.map((x) => {
            return (
              <CardProductos
                key={x.codigoProducto}
                codigoProducto={x.codigoProducto}
                nombreProducto={x.nombreProducto}
                precio={x.precio}
                categoria={x.categoria}
                tienda={tienda}
              />
            );
          })}
        </div>
        <div className="row justify-content-center">
          {tienda === "" ? (
            <Link
              className="btn color-components col-md-2 col-6 row-animation"
              to="/"
              onClick={(e) => e.preventDefault()}
            >
              Ver Mas
            </Link>
          ) : (
            <Link
              className="btn color-components col-md-2 col-6 row-animation"
              to={`/${tienda}`}
            >
              Ver Mas
            </Link>
          )}
        </div>
      </section>
    );
  }
};
