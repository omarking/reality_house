import React from "react";

export const Perfil = () => {
  return (
    <div>
      <div className="row mx-auto mt-3 justify-content-around">
        <div className="col-10 col-md-6 m-auto">
          <h3>Perfil: Nombre Vendedor</h3>
          <p>Nombre: **********</p>
          <p>Email: email@email.com</p>
          <p>Telefono: 00000000</p>
          <button className="btn color-components">Cambiar Contraseña</button>
        </div>

        <div className="col-10 col-md-2 m-auto">
          <div
            className="img-perfil rounded"
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/4646246/pexels-photo-4646246.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")',
            }}
          ></div>
          <button className="btn color-components">Cambiar Imagen</button>
        </div>
      </div>

      <hr className="my-4" />

      <div className=" row mx-auto mt-3 justify-content-around">
        <div className="col-10 col-md-4 mx-auto mb-4">
          <h3>Suscripcion:</h3>
          <h4>Estado: Free</h4>
          <button className="btn color-components">Cambiar a Premium</button>
        </div>

        <div className="row col-10 col-md-6 mx-auto border rounded">
          <div className="col-12 col-md-6">
            <h4>Free</h4>
            <p>
              <i className="uil uil-check text-success"></i> Benefist
            </p>
            <p>
              <i className="uil uil-check text-success"></i> Benefist
            </p>
            <p>
              <i className="uis uis-multiply text-danger"></i> Benefist
            </p>
            <p>
              <i className="uis uis-multiply text-danger"></i> Benefist
            </p>
            <p>
              <i className="uis uis-multiply text-danger"></i> Benefist
            </p>
          </div>
          <div className="col-12 col-md-6">
            <h4>Premium</h4>
            <p>
              <i className="uil uil-check text-success"></i> Benefist
            </p>
            <p>
              <i className="uil uil-check text-success"></i> Benefist
            </p>
            <p>
              <i className="uil uil-check text-success"></i> Benefist
            </p>
            <p>
              <i className="uil uil-check text-success"></i> Benefist
            </p>
            <p>
              <i className="uil uil-check text-success"></i> Benefist
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
