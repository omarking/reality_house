import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import CardArtVend from "../../components/admin/CardArtVend";
import { CardProductos } from "../../components/general/CardProductos";
import { handlePost } from "../../functions/axiosPost";

export const PerfilVendedor = () => {
  const {vendedor} = useParams();
  const history = useHistory();

  const [usuario, setUsuario] = useState([]);
  const [productos, setProductos] = useState([]);
  const [estado, setEstado] = useState("");
  
   const handleGetDataUser = () => {
    const f = new FormData();
    f.append('p', 'getInfoUser');
    f.append('idUser', vendedor);
    const resp = handlePost(f);
    resp.then(res => {
      setUsuario(res.data);
      setEstado(res.data.statusUsuario);
    });
  };

  const handleProducts = () => {
    const t = new FormData();
    t.append('p', 'getProductsFromStore');
    t.append('w', vendedor);
    const resp = handlePost(t);
    resp.then(res => { setProductos(res.data) })
  };

  const handleDelete = (estado) => {
    const f = new FormData();
    f.append('p', 'changeStatusUser');
    f.append('id', usuario.usuario);
    f.append('estado', estado);
    const resp = handlePost(f);
    resp.then(res => {
      if(res.data === true){
        history.push(`/admin/${vendedor}`);
        swal({
          title: "Exito",
          icon: "success"
        })
      }
    })
  }

  useEffect(() => { 
    handleGetDataUser();
    handleProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);


  return (
    <div>
      <div className="row mx-auto mt-3 justify-content-start">
        <div className="col-12 col-md-12">
          <h3> { usuario.nombreTienda } </h3>
          <p>Nombre: {`${usuario.nombreUsuario+" "+usuario.apellidoUnoUsuario+" "+usuario.apellidoDosUsuario}`} </p>
          <p>Email: {usuario.emailUsuario} </p>
          <p>Telefono: {usuario.telefonoUsuario} </p>
        </div>
        
        <div className="col-4">
          <Link to={`/admin/edit/${vendedor}`} className="btn btn-editar auto">Editar</Link>
          {
            estado === '1' ?
            (<button onClick={()=>{handleDelete(0)}} className="btn btn-eliminar auto m-4" >Suspender</button>)
            :
            (<button onClick={()=>{handleDelete(1)}} className="btn btn-eliminar auto m-4" >Activar  </button>)
          }
        </div>
      </div>

      <div className="row w-75 mx-auto justify-content-center">
        <h2>Productos</h2>
      </div>

      <div className="w-100 d-flex flex-wrap justify-content-center">
        {
          (usuario.membresia === 'FREE') ?
          (
            productos.map( x => {
              return ( <CardProductos 
                key={x.codigoProducto}
                urlImg={x.imgPrincipal} 
                codigoProducto={x.codigoProducto} 
                nombreProducto={x.nombreProducto} 
                precio={x.precio} 
                categoria={x.categoria} 
                tienda={usuario.nombreTienda} /> )
            })
          )
          :
          (productos.map(x => {
            return ( <CardArtVend 
              key={x.codigoProducto}
              id={x.codigoProducto} 
              titulo={x.nombreProducto} 
              categoria={x.categoria} 
              marca={x.nombreMarca} 
              precio={x.precio} 
              estado={x.modelo3D}
              imgPrincipal={x.imgPrincipal}
              codigoQR={x.imagenQR}
              tienda={usuario.nombreTienda} />
               )
          }))
        }
      </div>

    </div>
  );
};
