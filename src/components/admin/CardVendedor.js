import React from "react";
import { Link } from "react-router-dom";

export const CardVendedor = ({nombre, logo, membresia}) => {
  
  const handleCheck = () =>{
    if(membresia === 'FREE'){
      return false;
    }
    if(membresia === 'PREMIUM'){
      return true;
    }
  }
  const sus = handleCheck();

  return (
    <div className="col-md-5 col-lg-3 col-sm-5 col-8 rounded border text-center m-2">
      <h3>{nombre}</h3>
      <div
        className="img-perfil rounded-circle mx-auto"
        style={{
          backgroundImage:
            `url(${logo})`,
        }}
      ></div>
      <div className="card-body">
        <p className="card-text text-danger">Faltam Modelos 3D</p>
        <h4>Suscripcion</h4>
        <div className="col-12 mb-3">
          <input type="checkbox" className="form-check-input" checked={sus} onChange={()=>{}} />
          <label className="form-check-label mr-5">
            Free
          </label>
          <input type="checkbox" className="form-check-input" checked={!sus}  onChange={()=>{}} />
          <label className="form-check-label">
            Premium
          </label>
        </div>
        <Link to={`/admin/${nombre}`} className="btn color-components">Ver Mas</Link>
      </div>
    </div>
  );
};
