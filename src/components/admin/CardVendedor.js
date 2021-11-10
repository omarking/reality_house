import React from "react";

export const CardVendedor = () => {
  return (
    <div className="col-md-5 col-lg-3 col-sm-5 col-8 rounded border text-center m-2">
      <h3>Nombre tienda</h3>
      <div
        className="img-perfil rounded-circle mx-auto"
        style={{
          backgroundImage:
            'url("https://i.blogs.es/66b2a4/photo-1511367461989-f85a21fda167/1366_2000.jpeg")',
        }}
      ></div>
      <div className="card-body">
        <p className="card-text text-danger">Faltam Modelos 3D</p>
        <h4>Suscripcion</h4>
        <div className="col-12 mb-3">
          <input type="checkbox" className="form-check-input" />
          <label className="form-check-label mr-5">
            Free
          </label>
          <input type="checkbox" className="form-check-input" />
          <label class="form-check-label">
            Premium
          </label>
        </div>
        <button className="btn color-components">Ver Mas</button>
      </div>
    </div>
  );
};
