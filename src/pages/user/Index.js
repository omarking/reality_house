import axios from "axios";
import React, { useEffect, useState } from "react";
import { CardProductos } from "../../components/general/CardProductos";
import { CategoryBar } from "../../components/general/CategoryBar";


export const Index = () => {
  const [searchText, setSearchText] = useState("");
  const [productos, setProductos] = useState([]);


  /* Con esta funcionn traemos todos los objetos de la tienda desde el back */
  const dataObject = () => {
    axios
      .get(
        `http://localhost/realityhouse/api/productos.php?p=todosproductos`
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
        `http://localhost/realityhouse/api/productos.php?p=buscarTodos&w=${event.target.value}`
      )
      .then((res) => {
        setProductos(res.data);
      });
  };

  /* Buscamos Productos por categoria */
  const selectCategory = (categoria) => {
    axios
      .get(
        `http://localhost/realityhouse/api/productos.php?p=categoriaTodos&c=${categoria}`
      )
      .then((res) => {
        setProductos(res.data);
      });
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    dataObject();
  }, []);

  return (
    <div id="productos">
      <h2 className="text-center mt-5 mb-2">Catalogo</h2>
      <hr className="w-75 " />
      <div className="row w-75 m-auto justify-content-between align-middle">

            <CategoryBar selectCategory={selectCategory} />

        <input
          className="form-control col-2"
          type="text"
          value={searchText}
          onChange={changeTextSearch}
          placeholder="Buscar"
        />
      </div>

      <div className="row justify-content-center mx-auto mt-4">
        {/* Productos */}
        {productos == null ? (
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          productos.map((x) => {
            return (
              <CardProductos
                key={x.codigoProducto}
                codigoProducto={x.codigoProducto}
                nombreProducto={x.nombreProducto}
                precio={x.precio}
                categoria={x.categoria}
                tienda={x.nombreTienda}
              />
            );
          })
        )}
      </div>
      <div className="row justify-content-center"></div>
    </div>
  );
};
