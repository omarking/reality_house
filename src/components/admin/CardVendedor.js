  import React from "react";
import { useHistory } from "react-router-dom";
  import { Link } from "react-router-dom";
  import { useEffect, useState } from "react/cjs/react.development";
  import swal from "sweetalert";
  import { handlePost } from "../../functions/axiosPost";

  export const CardVendedor = ({ nombre, logo, membresia, idTienda }) => {
    const history = useHistory();
    const [suscripcion, setSuscripcion] = useState(false);

    const handleCheck = () => {
      if (membresia === "FREE") {
        setSuscripcion(true);
      }
      if (membresia === "PREMIUM") {
        setSuscripcion(false);
      }
    };

    const handleChangeSus = ({target}) => { 
      swal({
        title: "Cambio de Suscripcion:",
        text: `Confirme el cambio de membresia para: ${nombre}`,
        icon: "warning",
        buttons: ["Cancelar", "Confirmar"],
      }).then((res) => {
        if (res) {
          handleChangeMembresia(target.name);
        }
      });
    };

    const handleChangeMembresia = (membresia) => {
      const f = new FormData();
      f.append('p', 'changeMembresia');
      f.append('idTienda', idTienda);
      f.append('membresia', membresia);
      const resp = handlePost(f);
      resp.then(res =>{
        if(res.data){
          history.replace("/admin");
        }
      })
    }

    useEffect(() => {
      handleCheck();
    }, []);

    return (
      <div className="col-md-5 col-lg-3 col-sm-5 col-8 rounded border text-center m-2">
        <h3>{nombre}</h3>
        <div
          className="img-perfil rounded-circle mx-auto"
          style={{
            backgroundImage: `url(${logo})`,
          }}
        ></div>
        <div className="card-body">
          {membresia === "PREMIUM" && (
            <p className="card-text text-danger">Faltan Modelos 3D</p>
          )}
          <h4>Suscripcion</h4>
          <div className="col-12 mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              name="Free"
              checked={suscripcion}
              onChange={handleChangeSus}
            />
            <label className="form-check-label mr-5">Free</label>
            <input
              type="checkbox"
              className="form-check-input"
              name="Premium"
              checked={!suscripcion}
              onChange={handleChangeSus}
            />
            <label className="form-check-label">Premium</label>
          </div>
          <Link to={`/admin/${nombre}`} className="btn color-components">
            Ver Mas
          </Link>
        </div>
      </div>
    );
  };
