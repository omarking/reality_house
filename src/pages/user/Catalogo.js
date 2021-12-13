import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { CardProducto } from "../../components/user/CardProducto";
import { CategoryBar } from "../../components/general/CategoryBar";
import { Link } from "react-router-dom";
import { handlePost } from "../../functions/axiosPost";

export const Catalogo = () => {
  const [searchText, setSearchText] = useState("");
  const [productos, setProductos] = useState([]);
  const {user} = useContext(AuthContext);
  const tienda = user.tienda;


  /* Con esta funcionn traemos todos los objetos de la tienda desde el back */
  const handleProducts = (tienda) => {
    const p = new FormData();
    p.append('p', 'getProductsFromStore');
    p.append('w', tienda);
    const resp = handlePost(p);
    resp.then(res => { setProductos(res.data)});
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        { !productos ? (
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          productos.map((x) => {
            return (
              <CardProducto
              urlImagen={x.imgPrincipal}
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
