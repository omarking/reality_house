import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { CardProducto } from "../../components/user/CardProducto";
import { CategoryBar } from "../../components/general/CategoryBar";
import { Link } from "react-router-dom";

export const Catalogo = () => {
  const [searchText, setSearchText] = useState("");
  const [productos, setProductos] = useState([]);
  const {user} = useContext(AuthContext);
  const tienda = user.tienda;


  /* Con esta funcionn traemos todos los objetos de la tienda desde el back */
  const dataObject = (tienda) => {
    axios
      .get(
        `http://localhost/realityhouse/api/productos.php?p=productos&t=${tienda}`
      )
      .then((res) => {
        setProductos(res.data);
      });
  };

  /* con esta funcion traemos todos los objetos que coincidan con el texto que se busquen */
  const changeTextSearch = (event) => {
    setSearchText(event.target.value);
    axios
      .get(
        `http://localhost/realityhouse/api/productos.php?p=buscar&t=${tienda}&w=${event.target.value}`
      )
      .then((res) => {
        setProductos(res.data);
      });
  };

  /* Buscamos Productos por categoria */
  const selectCategory = (categoria) => {
    axios
      .get(
        `http://localhost/realityhouse/api/productos.php?p=categoria&t=${tienda}&c=${categoria}`
      )
      .then((res) => {
        setProductos(res.data);
      });
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    dataObject(tienda);
  }, []);

  return (
    <div id="productos">
      <h2 className="text-center mt-5 mb-2">{tienda}</h2>
      <hr className="w-75 " />
      <div className="row w-75 mx-auto my-3 justify-content-between align-middle">
            <CategoryBar selectCategory={selectCategory} />
        <input
          className="form-control col-2"
          type="text"
          value={searchText}
          onChange={changeTextSearch}
          placeholder="Buscar"
        />

    <Link to="/user/agregar" className="btn color-components" >Agregar Producto</Link>

      </div>

      <div className="row justify-content-center m-auto">
        {/* Productos */}
        {productos == null ? (
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          productos.map((x) => {
            return (
              <CardProducto
                key={x.codigoProducto}
                codigoProducto={x.codigoProducto}
                nombreProducto={x.nombreProducto}
                precio={x.precio}
                categoria={x.categoria}
                tienda={tienda}
              />
            );
          })
        )}
      </div>
      <div className="row justify-content-center"></div>
    </div>
  );
};
