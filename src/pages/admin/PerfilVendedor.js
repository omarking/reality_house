import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardArtVend from "../../components/admin/CardArtVend";
import { CategoryBar } from "../../components/general/CategoryBar";
import { handlePost } from "../../functions/axiosPost";

export const PerfilVendedor = () => {
  const [usuario, setUsuario] = useState([]);
  const [productos, setProductos] = useState([]);
  const {vendedor} = useParams();
  
   const handleGetDataUser = () => {
    const f = new FormData();
    f.append('p', 'getInfoUser');
    f.append('idUser', vendedor);
    const resp = handlePost(f);
    resp.then(res => {
      setUsuario(res.data);
    });
  };

  const handleProducts = () => {
    const t = new FormData();
    t.append('p', 'getProductsFromStore');
    t.append('w', vendedor);
    const resp = handlePost(t);
    resp.then(res => { setProductos(res.data) })
  };

  useEffect(() => { 
    handleGetDataUser();
    handleProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);


  return (
    <div>
      <div className="row mx-auto mt-3 justify-content-start">
        <div className="col-10 col-md-6 ml-5">
          <h3> { usuario.nombreTienda } </h3>
          <p>Nombre: {usuario.nombre} </p>
          <p>Email: {usuario.emailUsuario} </p>
          <p>Telefono: {usuario.telefonoUsuario} </p>
        </div>
      </div>

      <div className="row w-75 mx-auto justify-content-center">
        <h2>Productos</h2>
      </div>

      <div className="w-100">
        {
          productos.map(x => {
            return ( <CardArtVend id={x.codigoProducto} 
              titulo={x.nombreProducto} 
              categoria={x.categoria} 
              marca={x.nombreMarca} 
              precio={x.precio} 
              estado={x.modelo3D} /> )
          })
        }
      </div>

    </div>
  );
};
