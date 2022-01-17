import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CardVendedor } from "../../components/admin/CardVendedor";
import { handlePost } from "../../functions/axiosPost";

export const Index = () => {
  const history = useHistory();
  const [usuarios, setUsuarios] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStores, setFilterStores] = useState([]);
  
  const handleGetDataUsers = () =>{
    const f = new FormData();
    f.append('p', 'query');
    f.append('w', 'AllStores');
    const resp = handlePost(f);
    resp.then(res =>{
      setUsuarios(res.data);
      setFilterStores(res.data);
    })
  }

  const handleSelectReg = ({target}) => {
    const rol = target.value;
    if(rol === 'Administrador'){
      history.push('/admin/registro/admin');
    }
    if(rol === 'Usuario'){
      history.push('/admin/registro/user');
    }

  };

  const handleSearchStore = ({target}) => {
    const text = target.value;
    setSearch(text);
    if( text.length > 0){
    setUsuarios(
      filterStores.filter( x => {
        const filtro = x.nombreTienda.toString().toLowerCase()
        return ( filtro.indexOf(text.toString().toLowerCase()) > -1 )
      }
    ))
    }else{
      setUsuarios(filterStores);
    } 
  }

  useEffect(()=>{
    handleGetDataUsers();
  },[]);

  return (
    <div>
      <div className="w-75 mx-auto mt-3 row justify-content-between">
        <input
          type="text"
          value={search}
          onChange={handleSearchStore}
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
