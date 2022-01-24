import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { handlePost, urlServer } from "../../functions/axiosPost";

export const CardVendedor = ({ nombre, logo, membresia, idTienda, estado }) => {
  /* states */
  const history = useHistory();
  const [suscripcion, setSuscripcion] = React.useState(false);
  const [modelo, setModelo] = React.useState({});

  /* Esta funcion cambia el valor de los ckeck que muestran el estado de la suscripcion */
  const handleCheck = () => {
    if (membresia === "FREE") {
      setSuscripcion(true);
    }
    if (membresia === "PREMIUM") {
      setSuscripcion(false);
    }
  };

  /* con esta funcion obtenemos el estado de los modelos para poder reflejarlo en la tarjeta del usuario */
  const handleGetStatusModel = () => {
    const f = new FormData();
    f.append('p', 'getModel');
    f.append('tienda', nombre);
    const resp = handlePost(f);
    resp.then(res => {
      setModelo(res.data);
    })
  }

  /* Esta funcion llama a changeMembresia la cual cambia de FREE a PREMIUM segun se le asigne */
  const handleChangeSus = ({ target }) => {
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

  /* Esta funcion manda una peticion para que se cambia la membresia del usuario */
  const handleChangeMembresia = (membresia) => {
    const f = new FormData();
    f.append("p", "changeMembresia");
    f.append("idTienda", idTienda);
    f.append("membresia", membresia);
    const resp = handlePost(f);
    resp.then((res) => {
      if (res.data) {
        history.replace("/admin");
      }
    });
  };

  useEffect(() => {
    handleCheck();
    handleGetStatusModel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="col-md-5 col-lg-3 col-sm-5 col-8 rounded border text-center m-2">
      <h3>{nombre}</h3>
      <div
        className="img-perfil rounded-circle mx-auto"
        style={{
          backgroundImage: `url("${logo !== null ? urlServer+logo : "./img/profile.png"}")`,
        }}
      ></div>
      <div className="card-body">
        {membresia === "PREMIUM" && (
          (parseInt(modelo.terminado) === parseInt(modelo.total)) ?
          (<p className="card-text text-success">Modelos 3D Terminados</p>)
          :
          (<p className="card-text text-danger">Faltan Modelos 3D</p>)
          
          
        )}
        {
          estado === "1" &&
          (<div>
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
          </div>)
        }
        <Link to={`/admin/${nombre}`} className="btn color-components">
          Ver Mas
        </Link>
      </div>
    </div>
  );
};
