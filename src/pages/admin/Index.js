import React from "react";
import { CardVendedor } from "../../components/admin/CardVendedor";
import { useAxiosPost } from "../../hooks/useAxiosPost";

export const Index = () => {
  const urlUsuario ='http://localhost/realityhouse/api/user.php';
  const f = new FormData();
  f.append('p', 'dataC')
  const {data: dataUsuario, loading: loadingUsuario} = useAxiosPost(urlUsuario, f);
  const usuarios = !!dataUsuario && dataUsuario;
  console.log(usuarios)

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
        <button className="btn color-components">Agregar Usuario</button>
      </div>
      <div className="row justify-content-around mx-auto mt-3" style={{maxWidth: '1440px'}}>
        {
          !loadingUsuario && 
          (
            usuarios.map((x,i) =>{
              if(x.nombreTienda !== null){
                return <CardVendedor key={i} nombre={x.nombreTienda} logo={x.logoTienda} membresia={x.membresia} />
              }
            })
          )
        }
      </div>
    </div>
  );
};
