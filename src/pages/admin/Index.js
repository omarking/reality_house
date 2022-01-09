import React, { useEffect, useState } from "react";
import { CardVendedor } from "../../components/admin/CardVendedor";
import { handlePost } from "../../functions/axiosPost";

export const Index = ({history}) => {
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

  const handleSelectReg = ({target}) => {
    const rol = target.value;
    if(rol === 'Administrador'){
      history.replace('/admin/registro/admin');
    }
    if(rol === 'Usuario'){
      history.replace('/admin/registro/user');
    }

  };

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
        <select className="btn color-components" onChange={handleSelectReg}>
    <option>Registrar Usuario</option>
    <option>Administrador</option>
    <option>Usuario</option>
  </select>
      </div>
      <div className="row justify-content-around mx-auto mt-3" style={{maxWidth: '1440px'}}>

      {
        usuarios && 
        (
          usuarios.map( (x) =>{
            return <CardVendedor key={x.usuario} nombre={x.nombreTienda} logo={x.logoTienda} membresia={x.membresia} idTienda={x.usuario} />
          })
        )
      }
  
      </div>
    </div>
  );
};
