import React from "react";  

export const CardAdmin = ({ nombre="Administrador", id }) => {

  return (
    <div className="col-md-5 col-lg-3 col-sm-5 col-8 rounded border text-center m-2">
      <h3>{nombre}</h3>

      <div className="card-body">

        <button className="btn btn-eliminar">
            Suspender
        </button>
      </div>
    </div>
  );
};
