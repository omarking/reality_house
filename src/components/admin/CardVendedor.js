import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export const CardVendedor = ({nombre, logo, membresia}) => {
  
  const handleCheck = () =>{
    if(membresia === 'FREE'){
      return false;
    }
    if(membresia === 'PREMIUM'){
      return true;
    }
  }

  const handleChangeSus = (e) => {
    swal({
      title: "Cambio de Suscripcion:",
      text: `Ingrese su contrasena de administrador para cambiar la suscripcion de ${nombre}`,
      icon: 'warning',
      content: {
        element: "input",
        attributes: {
          placeholder: "Ingrese su contrasena",
          type: "password"
        }
      }
    })
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
        {
          (membresia === "FREE") && (<p className="card-text text-danger">Faltan Modelos 3D</p>)
        }
        <h4>Suscripcion</h4>
        <div className="col-12 mb-3">
          <input type="checkbox" className="form-check-input" checked={sus} onChange={handleChangeSus} />
          <label className="form-check-label mr-5">
            Free
          </label>
          <input type="checkbox" className="form-check-input" checked={!sus}  onChange={handleChangeSus} />
          <label className="form-check-label">
            Premium
          </label>
        </div>
        <Link to={`/admin/${nombre}`} className="btn color-components">Ver Mas</Link>
      </div>
    </div>
  );
};
