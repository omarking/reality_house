import React from "react";
import { CategoryBar } from "../../components/general/CategoryBar";

export const PerfilVendedor = () => {
  return (
    <div>
      <div className="row mx-auto mt-3 justify-content-start">
        <div className="col-10 col-md-6">
          <h3>Perfil: Nombre Vendedor</h3>
          <p>Nombre: **********</p>
          <p>Email: email@email.com</p>
          <p>Telefono: 00000000</p>
        </div>
      </div>

      <div className="row w-75 mx-auto">
        <CategoryBar />
      </div>
      <div className="row w-100">
        <div className="card col-10 mx-auto mt-3">
          <div className="card-body row">
            <div
              className="img-card col-2"
              style={{
                backgroundImage:
                  'url("https://images.pexels.com/photos/8112950/pexels-photo-8112950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")',
              }}
            ></div>
            <div className="col-4">
              <h3>Titulo Informacion</h3>
              <p className="text-mute">Categoria</p>
              <p>Vendedor:</p>
              <p>
                <strong>$112345</strong>
              </p>
            </div>

            <div className="col-4">
              <h5>Modelo 3D Terminado:</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Si
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck2"
                  disabled
                />
                <label className="form-check-label" htmlFor="defaultCheck2">
                  No
                </label>
              </div>
            </div>

            <div className="col-2">
            <button className="btn color-components" >Descargar QR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
