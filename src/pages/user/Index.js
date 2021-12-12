import React, { useEffect, useState } from "react";
import { CardProductos } from "../../components/general/CardProductos";
import { CategoryBar } from "../../components/general/CategoryBar";
import { handlePost } from "../../functions/axiosPost";

export const Index = () => {
  const [searchText, setSearchText] = useState("");
  const [productos, setProductos] = useState([]);

  /* Con esta funcionn traemos todos los objetos de la tienda desde el back */
  const handleAllProducts = () => {
    const p = new FormData();
    p.append('p', 'query');
    p.append('w', 'AllProducts');
    const resp = handlePost(p);
    resp.then(res => {setProductos(res.data)});
  };

  /* con esta funcion traemos todos los objetos que coincidan con el texto que se busquen */
  const changeTextSearch = (event) => {
    setSearchText(event.target.value);
    const p = new FormData();
    p.append('p', 'allProductsS');
    p.append('w', event.target.value);
    const resp = handlePost(p);
    resp.then( res => { setProductos(res.data) } )
  };

  /* Buscamos Productos por categoria */
  const selectCategory = (categoria) => {
    const p = new FormData();
    p.append('p', 'allProductsC');
    p.append('c', categoria);
    const resp = handlePost(p);
    resp.then( res => { setProductos(res.data) });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    handleAllProducts();
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
        { productos && (
          productos.map((x) => {
            return (
              <CardProductos
                key={x.codigoProducto}
                urlImg={x.imgPrincipal}
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
