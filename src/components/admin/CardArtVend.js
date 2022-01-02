import React from "react";

const CardArtVend = ({id, imgPrincipal, titulo, categoria, marca, precio, estado,}) => {
  console.log(typeof estado);
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

        {estado === "1" ? (
          <fieldset className="col-10 d-flex justify-content-center align-items-center flex-wrap">
            <label className="text-center col-12 col-lg-6">
              <input type="radio" name={id} checked /> Terminado
            </label>
            <label className="text-center col-12 col-lg-6">
              <input type="radio" name={id} /> Pendiente
            </label>
          </fieldset>
        ) : (
          <fieldset className="col-10 d-flex justify-content-center align-items-center flex-wrap">
            <label className="text-center col-12 col-lg-6">
              <input type="radio" name={id} /> Terminado
            </label>
            <label className="text-center col-12 col-lg-6">
              <input type="radio" name={id} checked /> Pendiente
            </label>
          </fieldset>
        )}
      </div>

      <div className="col-12 col-md-3 d-flex justify-content-center align-items-center my-2">
        <button className="btn color-components">Descargar-QR</button>
      </div>
    </div>
  );
};

export default CardArtVend;
