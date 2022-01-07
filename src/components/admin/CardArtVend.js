import React from "react";
import { Link, useParams } from "react-router-dom";

const CardArtVend = ({id, imgPrincipal, titulo, categoria, marca, precio, estado,}) => {
  const {vendedor} = useParams();
  const codigoProducto = id;

  const handleChangeStatusModel = () => {
    console.log("Listo")
  }
  
  return (
    <div className="row w-75 mx-auto my-2 border rounded ">
      <div
        className="col-12 col-md-3 img-card"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/8112950/pexels-photo-8112950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")',
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
              name="Free"
              checked={true}
              onChange={handleChangeStatusModel}
            />
            <label className="form-check-label mr-5">Terminado</label>
          </div>

          <div className="col-12 text-center" >
          <input
              type="checkbox"
              className="form-check-input"
              name="Free"
              checked={false}
              onChange={handleChangeStatusModel}
            />
            <label className="form-check-label mr-5">Pendiente</label>
          </div>
            
          </div>


      </div>

      <div className="col-12 col-md-3 d-flex justify-content-center align-items-center my-2 flex-wrap">
        <button className="btn color-components m-5 col-10 col-md-6">Descargar-QR</button>
        <Link to={`${vendedor}/${codigoProducto}/agregar-qr`} className="btn color-components m-5 col-10 col-md-6">Agregar-QR</Link>
      </div>
    </div>
  );
};

export default CardArtVend;
