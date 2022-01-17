import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { CardProducto } from "../../components/user/CardProducto";
import { CategoryBar } from "../../components/general/CategoryBar";
import { Link } from "react-router-dom";
import { handlePost } from "../../functions/axiosPost";

export const Catalogo = () => {
  const [searchText, setSearchText] = useState("");
  const [productos, setProductos] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const {user} = useContext(AuthContext);
  const tienda = user.tienda;


  /* Con esta funcionn traemos todos los objetos de la tienda desde el back */
  const handleProducts = (tienda) => {
    const p = new FormData();
    p.append('p', 'getProductsFromStore');
    p.append('w', tienda);
    const resp = handlePost(p);
    resp.then(res => { 
      setProductos(res.data)
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
                tienda={tienda}
                codigoProducto={x.codigoProducto}
                nombreProducto={x.nombreProducto}
                precio={x.precio}
                categoria={x.categoria}
              />
            );
          })
        )}
      </div>
      <div className="row justify-content-center"></div>
    </div>
  );
};
