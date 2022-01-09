import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { handlePost } from "../../functions/axiosPost";

const CardArtVend = ({id, imgPrincipal, titulo, categoria, marca, precio, estado, codigoQR}) => {
  const {vendedor} = useParams();
  const codigoProducto = id;
  const servidor = "http://localhost/Residencia/api/";

  /* states */
  const [statusModel, setStatusModel] = useState((estado === "1") ? true : false);

  const handleChangeStatusModel = ({target}) => {
    if(target.name === 'terminado'){
      setStatusModel(true);
      handleStatus(1);
    }else if(target.name === 'pendiente'){
      setStatusModel(false);
      handleStatus(0)
    }
  }

  const handleStatus = (estado) => {
    const f = new FormData();
    f.append('p', 'changeStatusModel');
    f.append('idProducto', codigoProducto);
    f.append('estado', estado);
    const resp = handlePost(f);
    resp.then(res => {
      console.log(res.data);
    });
  };
  
  return (
    <div className="row w-75 mx-auto my-2 border rounded ">
      <div
        className="col-12 col-md-3 img-card"
        style={{
          backgroundImage:
            `url("${servidor}${imgPrincipal}")`,
        }}
      ></div>

      <div className="col-12 col-md-3">
        <h4 className="mt-1 mt-md-5">{titulo}</h4>
        <p className="text-mute">Categoria: {categoria}</p>
        <p>Marca: {marca} </p>
        <p>
          Precio:
          <strong> ${precio} </strong>
        </p>
      </div>

      <div className="col-12 col-md-3 d-flex justify-content-center align-items-center flex-wrap">
        <h4 className="col-12 text-center"> Estado del modelo 3D</h4>

        <div className="col-10 d-flex justify-content-center align-items-center flex-wrap">
          <div className="col-12 text-center" >
          <input
              type="checkbox"
              className="form-check-input"
              name="terminado"
              checked={statusModel}
              onChange={handleChangeStatusModel}
            />
            <label className="form-check-label mr-5">Terminado</label>
          </div>

          <div className="col-12 text-center" >
          <input
              type="checkbox"
              className="form-check-input"
              name="pendiente"
              checked={!statusModel}
              onChange={handleChangeStatusModel}
            />
            <label className="form-check-label mr-5">Pendiente</label>
          </div>
            
          </div>


      </div>

      <div className="col-12 col-md-3 d-flex justify-content-center align-items-center my-2 flex-wrap">
        {codigoQR ?
          (
            <a href={`${servidor}${codigoQR}`} download="codeQR.png" className="btn color-components m-5 col-10 col-md-6" target="_blank" >Descargar-QR</a>
          )  :
          (
            <button className="btn color-components m-5 col-10 col-md-6 disabled" disabled>Descargar-QR</button>
          )
      }
        <Link to={`${vendedor}/${codigoProducto}/agregar-qr`} className="btn color-components m-5 col-10 col-md-6">Agregar-QR</Link>
      </div>
    </div>
  );
};

export default CardArtVend;
