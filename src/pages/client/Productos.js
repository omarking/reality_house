import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CardProductos } from "../../components/general/CardProductos";
import { CategoryBar } from "../../components/general/CategoryBar";
import { handlePost } from "../../functions/axiosPost";

export const Productos = () => {
  const [searchText, setSearchText] = useState("");
  const [productos, setProductos] = useState([]);
  const { tienda } = useParams();
  const [store, setStore] = useState([])

  /* En este bloque llenamos la lista de tiendas */
  const handleGetDataStore = () => {
    const t = new FormData();
    t.append('p', 'query');
    t.append('w', 'stores');
    const resp = handlePost(t);
    resp.then(res => {setStore(res.data)});
  }

  /* Con esta funcionn traemos todos los objetos de la tienda desde el back */
    const handleProducts = (tienda) => {
    const t = new FormData();
    t.append('p', 'getProductsFromStore');
    t.append('w', tienda);
    const resp = handlePost(t);
    resp.then(res => { setProductos(res.data)})
  };

  /* con esta funcion traemos todos los objetos que coincidan con el texto que se busquen */
  const changeTextSearch = (event) => {
    setSearchText(event.target.value);
    const t = new FormData();
    t.append('p', 'searchProduct');
    t.append('s', tienda);
    t.append('w', event.target.value);
    const resp = handlePost(t)
    resp.then(res =>{setProductos(res.data)});
  };

  /* Con esta funcion redirigimos a otra tienda */
  const redirect = (event) => {
    window.location.href = `http://localhost:3000/${event.target.value}`;
  };

  /* Buscamos Productos por categoria */
  const selectCategory = (categoria) => {
    const t = new FormData();
    t.append('p', 'getProductForCategory');
    t.append('s', tienda);
    t.append('c', categoria);
    const resp = handlePost(t);
    resp.then(res => {setProductos(res.data)});
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    handleProducts(tienda);
    handleGetDataStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="productos">
      <h2 className="text-center mt-5 mb-2">{tienda}</h2>
      <hr className="w-75 " />
      <div className="row w-75 m-auto justify-content-between align-middle">
        <div className="form-group">
          <label>Seleccione Tienda</label>
          <select className="form-control" onChange={redirect}>
            <option>Seleccione</option>
            {!store ? (
              <option>Cargando...</option>
            ) : (
              store.map((x, i) => {
                return <option key={i}>{x.nombreTienda}</option>;
              })
            )}
          </select>
        </div>

            <CategoryBar selectCategory={selectCategory} />

        <input
          className="form-control col-2"
          type="text"
          value={searchText}
          onChange={changeTextSearch}
          placeholder="Buscar"
        />
      </div>

      <div className="row justify-content-center m-auto">
        {/* Productos */}
        { !productos ? (
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
