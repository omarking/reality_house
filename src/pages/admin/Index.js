import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CardVendedor } from "../../components/admin/CardVendedor";
import { handlePost } from "../../functions/axiosPost";

export const Index = () => {
  const [usuarios, setUsuarios] = useState([]);
  
  const handleGetDataUsers = () =>{
    const f = new FormData();
    f.append('p', 'query');
    f.append('w', 'AllStores');
    const resp = handlePost(f);
    resp.then(res =>{
      setUsuarios(res.data);
    })
  }

  useEffect(()=>{
    handleGetDataUsers();
  },[]);

  return (
    <div>
      <div className="w-75 mx-auto mt-3 row justify-content-between">
        <input
          type="text"
          name=""
          id=""
          placeholder="Buscar"
          className="col-2"
        />
        <Link className="btn color-components" to="/admin/registro-usuario" >Agregar Usuario</Link>
      </div>
      <div className="row justify-content-around mx-auto mt-3" style={{maxWidth: '1440px'}}>

      {
        usuarios && 
        (
          usuarios.map( (x, i) =>{
            return <CardVendedor key={i} nombre={x.nombreTienda} logo={x.logoTienda} membresia={x.membresia} />
          })
        )
      }
  
      </div>
    </div>
  );
};
