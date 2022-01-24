import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { handlePost } from "../../functions/axiosPost";
import { CardProductos } from "../general/CardProductos";

export const Productos = () => {
  const [tienda, setTienda] = React.useState("");
  const [productos, setProductos] = React.useState([]);
  const [datosTienda, setdatosTienda] = React.useState([])

  /* Obtenemos los nombres de las tiendas registradas en el sistema */
  const handleGetDataStore = () => {
    const t = new FormData();
    t.append('p', 'query');
    t.append('w', 'stores');
    const resp = handlePost(t);
    resp.then(res => {setdatosTienda(res.data)});
  }
  
  /* Obtenemos los productos de la tienda seleccionada */
  const handleProducts = (e) => {
    setTienda(e.target.value);
    const t = new FormData();
    t.append('p', 'getProductsFromStore');
    t.append('w', e.target.value);
    const resp = handlePost(t);
    resp.then(res => { setProductos(res.data)})
  };

  useEffect(() => {
    handleGetDataStore();
  }, [tienda])


    return (
      <section id="productos">
        <h2 className="text-center mt-5 mb-2">Productos</h2>
        <hr className="w-75 " />
        <div className="row w-75 m-auto justify-content-between">
          <div className="form-group">
            <label>Seleccione Tienda</label>

            <select onChange={handleProducts} className="form-control">
              <option>Seleccione</option>
              {
                datosTienda && (
                  datosTienda.map((x, i) => {
                    return (
                      <option key={i} value={x.nombreTienda}>
                        {x.nombreTienda}
                      </option>
                    );
                  })
                )
              }
            </select>
          </div>
          {tienda === "" ? <h3>Seleccione tienda</h3> : <h3>{tienda}</h3>}
        </div>
        
        <div className="row justify-content-center m-auto">
          {
            productos &&
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
                );
              })
            )
          }
        </div>
        <div className="row justify-content-center">

          {
          tienda && 
          (<Link className="btn color-components col-md-2 col-6 row-animation" to={`/${tienda}`}>Ver Mas</Link>)
          }

        </div>
      </section>
    );
};
