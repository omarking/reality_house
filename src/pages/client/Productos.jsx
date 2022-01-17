import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { CardProductos } from "../../components/general/CardProductos";
import { CategoryBar } from "../../components/general/CategoryBar";
import { NoFound } from "../../components/general/NoFound";
import { handlePost } from "../../functions/axiosPost";

export const Productos = () => {
  const history = useHistory();
  const { tienda } = useParams();
  const [searchText, setSearchText] = useState("");
  const [productos, setProductos] = useState([]);
  const [store, setStore] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);

  /* En este bloque llenamos la lista de tiendas */
  const handleGetDataStore = () => {
    const t = new FormData();
    t.append("p", "query");
    t.append("w", "stores");
    const resp = handlePost(t);
    resp.then((res) => {
      setStore(res.data);
    });
  };

  /* Con esta funcionn traemos todos los objetos de la tienda desde el back */
  const handleProducts = (tienda) => {
    const t = new FormData();
    t.append("p", "getProductsFromStore");
    t.append("w", tienda);
    const resp = handlePost(t);
    resp.then((res) => {
      setProductos(res.data);
      setFilterProduct(res.data);
    });
  };

  /* con esta funcion traemos todos los objetos que coincidan con el texto que se busquen */
  const changeTextSearch = ({target}) => {
    const text = target.value;
    setSearchText(text);
    if( text.length > 0){
    setProductos(
      filterProduct.filter( x => {
        const filtro = x.nombreProducto.toString().toLowerCase()
        return ( filtro.indexOf(text.toString().toLowerCase()) > -1 )
      }
    ))
    }else{
      setProductos( filterProduct );
    }
  };

  /* Con esta funcion redirigimos a otra tienda */
  const redirect = ({target}) => {
    history.push(`/${target.value}`);
  };

  /* Buscamos Productos por categoria */
  const selectCategory = (categoria) => {
    if( categoria !== 'Todos'){
    setProductos(
      filterProduct.filter( x => {
        const filtro = x.categoria.toString().toLowerCase()
        return ( filtro.indexOf(categoria.toString().toLowerCase()) > -1 )
      }
    ))
    }else{
      setProductos( filterProduct );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    handleProducts(tienda);
    handleGetDataStore();
  }, [tienda]);

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
         {(Object.keys(filterProduct).length > 0) ? 
        (
          productos.map((x) => {
            return (
              <CardProductos
                key={x.codigoProducto}
                urlImg={x.imgPrincipal}
                codigoProducto={x.codigoProducto}
                nombreProducto={x.nombreProducto}
                precio={x.precio}
                categoria={x.categoria}
                tienda={tienda}
              />
            )
          })
        )
        :
        (
          <NoFound message="La tienda que busca no exite o aun no ha subido sus productos."/>
        )} 
      </div>
    </div>
  );
};
